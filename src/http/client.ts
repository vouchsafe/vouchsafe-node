import {
  HttpResponse,
  PaginatedHttpResponse,
  CursorPaginatedHttpResponse,
  BaseClientOptions,
} from './types';
import { WithRawResponse } from './response-promise';
import { Page } from './page';
import { SseStream } from './utils/sse-stream';
import { RawResponse } from './utils/fetcher';
import { RequestHandlerChain } from './handlers/handler-chain';
import { HookHandler } from './handlers/hook-handler';
import { ResponseValidationHandler } from './handlers/response-validation-handler';
import { RequestValidationHandler } from './handlers/request-validation-handler';
import { CustomHook } from './hooks/custom-hook';
import { TerminatingHandler } from './handlers/terminating-handler';
import { RetryHandler } from './handlers/retry-handler';
import { LoggingHandler } from './handlers/logging-handler';
import { Request } from './transport/request';
import { isRequestCursorPagination } from './transport/types';
import { OAuthHandler } from './handlers/oauth-handler';

/**
 * Core HTTP client for making API requests.
 * Manages request/response handling through a chain of handlers for validation, retry, hooks, and more.
 */
export class HttpClient {
  /** Chain of request handlers that process requests in sequence */
  private readonly requestHandlerChain = new RequestHandlerChain();

  /**
   * Creates a new HTTP client with configured request handlers.
   * @param config - SDK configuration including base URL and authentication
   * @param hook - Optional custom hook for request/response interception
   */
  constructor(
    private config: BaseClientOptions,
    hook = new CustomHook(),
  ) {
    this.requestHandlerChain.addHandler(new ResponseValidationHandler());
    this.requestHandlerChain.addHandler(new RequestValidationHandler());
    this.requestHandlerChain.addHandler(new OAuthHandler());
    this.requestHandlerChain.addHandler(new RetryHandler());
    // Deliberately placed before HookHandler (not after): keeping HookHandler's status->thrown-error
    // conversion inside LoggingHandler's try/catch is what lets it log "error" for every HTTP error
    // status, not just transport failures. The tradeoff is that a custom hook's `beforeRequest`
    // mutation (if any) happens after this logs the request, so a hook-rewritten URL/header
    // wouldn't show up in the "HTTP Request" log line — only in "HTTP Response"/"HTTP Error", since
    // those come from the real call either way.
    this.requestHandlerChain.addHandler(new LoggingHandler());
    this.requestHandlerChain.addHandler(new HookHandler(hook));
    this.requestHandlerChain.addHandler(new TerminatingHandler());
  }

  /**
   * Executes a standard HTTP request.
   * @template T - The expected response data type
   * @param request - The HTTP request to execute
   * @returns A promise that resolves to the HTTP response
   */
  call<T>(request: Request): Promise<HttpResponse<T>> {
    return this.requestHandlerChain.callChain(request);
  }

  /**
   * Executes a standard HTTP request and returns only the data directly.
   * @template T - The expected response data type
   * @param request - The HTTP request to execute
   * @returns A promise that resolves to the response data
   */
  callDirect<T>(request: Request): Promise<T> {
    return this.call<T>(request).then((response) => response.data as T);
  }

  /**
   * Executes a standard HTTP request and returns the data alongside response metadata.
   * @template T - The expected response data type
   * @param request - The HTTP request to execute
   * @returns A promise that resolves to the response data and raw response metadata
   */
  callWithRawResponse<T>(request: Request): Promise<WithRawResponse<T>> {
    // `rawResponse` (not `metadata`) — fernMode's request-fetch-adapter/request-axios-adapter
    // always populate it (independent of the unrelated `responseHeaders` config flag) precisely
    // so this real, Fern-shaped `RawResponse` is available here.
    return this.call<T>(request).then((response) => ({
      data: response.data as T,
      rawResponse: response.rawResponse!,
    }));
  }

  /**
   * Executes a streaming HTTP request that yields responses incrementally.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to execute
   * @returns An async generator that yields HTTP responses
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    yield* this.requestHandlerChain.streamChain(request);
  }

  /**
   * Sends a streaming request and resolves once the response arrives, rejecting if the request fails first.
   * @template T - The expected response data type for each event
   * @param request - The HTTP request to execute
   * @returns A promise that resolves to the event stream and raw response metadata
   */
  async openStream<T>(request: Request): Promise<WithRawResponse<SseStream<T>>> {
    let openedResponse: RawResponse | undefined;
    let markOpen: (rawResponse: RawResponse) => void = () => undefined;
    const opened = new Promise<RawResponse>((resolve) => {
      markOpen = resolve;
    });
    request.onStreamOpen = (rawResponse) => {
      openedResponse = rawResponse;
      markOpen(rawResponse);
    };
    const responses = this.stream<T>(request);
    const first = responses.next();
    first.catch(() => undefined);
    const rawResponse = await Promise.race([
      opened,
      first.then((head) => openedResponse ?? this.rawResponseBeforeOpen(head, responses, request)),
    ]);
    return { data: new SseStream<T>(this.replayFirst(first, responses)), rawResponse };
  }

  private async rawResponseBeforeOpen<T>(
    head: IteratorResult<HttpResponse<T>>,
    responses: AsyncGenerator<HttpResponse<T>>,
    request: Request,
  ): Promise<RawResponse> {
    if (!head.done && head.value.rawResponse !== undefined) {
      return head.value.rawResponse;
    }
    await responses.return(undefined);
    const abortReason: unknown = request.config.abortSignal?.reason;
    throw abortReason instanceof Error
      ? abortReason
      : new Error('The stream ended before its response arrived.');
  }

  private async *replayFirst<T>(
    first: Promise<IteratorResult<HttpResponse<T>>>,
    rest: AsyncGenerator<HttpResponse<T>>,
  ): AsyncGenerator<HttpResponse<T>> {
    try {
      const head = await first;
      if (head.done) {
        return;
      }
      yield head.value;
      yield* rest;
    } finally {
      await rest.return(undefined);
    }
  }

  /**
   * Executes a paginated HTTP request and extracts the page data from the response.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The paginated HTTP request to execute
   * @returns A promise that resolves to the paginated HTTP response
   * @throws Error if the response contains no data to paginate through
   */
  public async callPaginated<FullResponse, Page>(
    request: Request<Page>,
  ): Promise<PaginatedHttpResponse<Page>> {
    const response = await this.call<FullResponse>(request as any);

    if (!response.data) {
      throw new Error('no response data to paginate through');
    }

    const page = this.getPage<FullResponse, Page>(request, response.data);

    return {
      ...response,
      data: page,
    };
  }

  /**
   * Executes a cursor-paginated HTTP request and extracts both page data and the next cursor.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The cursor-paginated HTTP request to execute
   * @returns A promise that resolves to the cursor-paginated HTTP response with next cursor
   * @throws Error if the response contains no data to paginate through
   */
  public async callCursorPaginated<FullResponse, Page>(
    request: Request<Page>,
  ): Promise<CursorPaginatedHttpResponse<Page>> {
    const response = await this.call<FullResponse>(request as any);

    if (!response.data) {
      throw new Error('no response data to paginate through');
    }

    const page = this.getPage<FullResponse, Page>(request, response.data);
    const nextCursor = this.getNextCursor<FullResponse, Page>(request, response.data);

    return {
      ...response,
      data: page,
      nextCursor,
    };
  }

  /**
   * Executes a cursor-paginated request and wraps the result in a `Page`, matching Fern's own
   * pagination surface exactly (see `Page`'s own doc). Fetches the first page eagerly; awaiting the
   * returned `Page` for its first batch, or iterating it directly with `for await`, both work.
   * @template FullResponse - The complete response type from the API
   * @template T - The type of a single item in the page
   * @param request - The cursor-paginated request to execute
   * @returns A `Page` over every item, fetching subsequent pages on demand
   */
  public async loadCursorPaginated<FullResponse, T>(
    request: Request<T[]>,
  ): Promise<Page<T, FullResponse>> {
    const initial = await this.callWithRawResponse<FullResponse>(request as unknown as Request);
    return new Page<T, FullResponse>({
      response: initial.data,
      rawResponse: initial.rawResponse,
      hasNextPage: (response) => !!this.getNextCursor<FullResponse, T[]>(request, response),
      getItems: (response) => this.getPage<FullResponse, T[]>(request, response),
      loadPage: (response) => {
        request.nextPage(this.getNextCursor<FullResponse, T[]>(request, response) ?? undefined);
        return this.callWithRawResponse<FullResponse>(request as unknown as Request);
      },
    });
  }

  /**
   * Executes a limit-offset-paginated request and wraps the result in a `Page`, matching Fern's own
   * pagination surface exactly.
   * @template FullResponse - The complete response type from the API
   * @template T - The type of a single item in the page
   * @param request - The limit-offset-paginated request to execute
   * @returns A `Page` over every item, fetching subsequent pages on demand
   */
  public async loadPaginated<FullResponse, T>(
    request: Request<T[]>,
  ): Promise<Page<T, FullResponse>> {
    const initial = await this.callWithRawResponse<FullResponse>(request as unknown as Request);
    return new Page<T, FullResponse>({
      response: initial.data,
      rawResponse: initial.rawResponse,
      // A page shorter than the requested size is the last page — the same heuristic the classic
      // (non-fernMode) pagination loop uses (see build-paginated-service-method.ts's `hasMore`).
      // Checking only `length > 0` would keep fetching forever once the API's last page happens to
      // be exactly full, or if the server clamps an out-of-range offset back to the same page
      // instead of ever returning empty.
      hasNextPage: (response) => {
        const data = this.getPage<FullResponse, T[]>(request, response);
        const pagination = request.pagination;
        const pageSize =
          pagination && !isRequestCursorPagination(pagination) ? pagination.pageSize : undefined;
        return data.length > 0 && (pageSize === undefined || data.length >= pageSize);
      },
      getItems: (response) => this.getPage<FullResponse, T[]>(request, response),
      loadPage: (response) => {
        // No declared `pageSize` (stepless offset — gap doc row 200) means `nextPage()` has no
        // fixed increment to fall back on; the only signal for how far the offset actually moved
        // is how many items this just-fetched page returned.
        const offsetIncrement = this.getPage<FullResponse, T[]>(request, response).length;
        request.nextPage(undefined, offsetIncrement);
        return this.callWithRawResponse<FullResponse>(request as unknown as Request);
      },
    });
  }

  /**
   * Updates the base URL for all subsequent requests.
   * @param url - The new base URL to use
   */
  setBaseUrl(url: string): void {
    this.config.baseUrl = url;
  }

  /**
   * Updates the SDK configuration.
   * @param config - The new SDK configuration
   */
  setConfig(config: BaseClientOptions): void {
    this.config = config;
  }

  /**
   * Extracts page data from a full API response using the configured pagination path.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The request containing pagination configuration
   * @param data - The full response data to extract the page from
   * @returns The extracted and parsed page data
   * @throws Error if pagination is not configured or page extraction fails
   */
  private getPage<FullResponse, Page>(request: Request<Page>, data: FullResponse): Page {
    if (!request.pagination) {
      throw new Error('getPage called for request without pagination property');
    }

    let curr: any = data;
    for (const segment of request.pagination.pagePath || []) {
      curr = curr[segment];
    }

    const page = curr;
    if (!page) {
      throw new Error(
        `error getting page data. Curr: ${JSON.stringify(curr)}. PagePath: ${request.pagination.pagePath}. Data: ${JSON.stringify(data)}`,
      );
    }
    return page;
  }

  /**
   * Extracts the next cursor from a full API response for cursor-based pagination.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The request containing cursor pagination configuration
   * @param data - The full response data to extract the cursor from
   * @returns The next cursor string, null if no more pages, or undefined if not cursor pagination
   */
  private getNextCursor<FullResponse, Page>(
    request: Request<Page>,
    data: FullResponse,
  ): string | null | undefined {
    if (!isRequestCursorPagination(request.pagination)) {
      return undefined;
    }

    let curr: any = data;
    for (const segment of request.pagination.cursorPath) {
      if (curr === null || curr === undefined) {
        return null;
      }
      curr = curr[segment];
    }

    // Fern's generated client performs no validation at all when the serde layer is off.
    return curr ?? null;
  }
}
