import { LogConfig, Logger } from './logger';
import { Supplier } from './supplier';
import { makePassthroughRequest, type PassthroughRequestConfig } from './passthrough-request';
import { getBinaryResponse } from '../response-promise';
import { fromJson, toJson } from '../../core/json';

/** Per-endpoint metadata a caller-supplied header/auth resolver can read (path, operation id, etc). */
export type EndpointMetadata = Record<string, unknown>;

/**
 * The raw fetch `Response`, minus its body-consuming members (`ok`/`body`/`bodyUsed` — this SDK's
 * result envelope already carries the parsed body separately) and any function members. Fern
 * drop-in parity (FSDK-429): a customer's existing code calling `core.fetcher(...)` directly
 * (bypassing the generated resource-client methods entirely) keeps working unchanged.
 */
export type RawResponse = Omit<
  {
    [K in keyof Response as Response[K] extends (...args: never[]) => unknown
      ? never
      : K]: Response[K];
  },
  'ok' | 'body' | 'bodyUsed'
>;

/** A `RawResponse` standing in for a request that never reached the network (aborted). */
export const abortRawResponse: RawResponse = {
  headers: new Headers(),
  redirected: false,
  status: 499,
  statusText: 'Client Closed Request',
  type: 'error',
  url: '',
};

/** A `RawResponse` standing in for a request that failed before a status code was known. */
export const unknownRawResponse: RawResponse = {
  headers: new Headers(),
  redirected: false,
  status: 0,
  statusText: 'Unknown Error',
  type: 'error',
  url: '',
};

/** Extracts the non-body fields of a real fetch `Response` into a `RawResponse`. */
export function toRawResponse(response: Response): RawResponse {
  return {
    headers: response.headers,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
    url: response.url,
  };
}

/** The outcome of an API call: a successful response, or a failed one. */
export type APIResponse<Success, Failure> = SuccessfulResponse<Success> | FailedResponse<Failure>;

export interface SuccessfulResponse<T> {
  ok: true;
  body: T;
  rawResponse: RawResponse;
}

export interface FailedResponse<T> {
  ok: false;
  error: T;
  rawResponse: RawResponse;
}

/**
 * Fern's low-level, configless request/response primitive (FSDK-429 drop-in parity) — exposed so
 * code written against `core.fetcher`/`Fetcher.Args` keeps working after switching generators.
 * This SDK's own generated methods do NOT route through this — they use `RequestBuilder`/
 * `HttpClient`, which (unlike Fern's fetcher) is bound to the SDK's constructor config and so
 * can't host a standalone configless function. The actual network call here is
 * `makePassthroughRequest` (the same one behind `client.fetch()`) — this is a thin translation
 * layer over it (Args -> its narrower config/init shape, its `Response`/thrown-error outcome ->
 * `APIResponse`), not a second retry/timeout/backoff implementation.
 */
export type FetchFunction = <R = unknown>(
  args: Fetcher.Args,
) => Promise<APIResponse<R, Fetcher.Error>>;

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Fetcher {
  export interface Args {
    url: string;
    method: string;
    contentType?: string;
    headers?: Record<string, unknown>;
    queryParameters?: Record<string, unknown>;
    queryString?: string;
    body?: unknown;
    timeoutMs?: number;
    maxRetries?: number;
    withCredentials?: boolean;
    abortSignal?: AbortSignal;
    requestType?: 'json' | 'file' | 'bytes' | 'form' | 'other';
    responseType?:
      | 'json'
      | 'blob'
      | 'sse'
      | 'streaming'
      | 'text'
      | 'arrayBuffer'
      | 'binary-response';
    duplex?: 'half';
    endpointMetadata?: EndpointMetadata;
    fetchFn?: typeof fetch;
    // Matches Fern's own `LogConfig | Logger` (FSDK-429) — kept in lockstep with
    // addLoggingConfigProperty's `logging` field in build-sdk-config.ts, since a
    // `BaseClientOptions`-typed value's `logging` gets forwarded into `Fetcher.Args` elsewhere.
    logging?: LogConfig | Logger;
  }

  export type Error =
    | FailedStatusCodeError
    | NonJsonError
    | BodyIsNullError
    | TimeoutError
    | UnknownError;

  export interface FailedStatusCodeError {
    reason: 'status-code';
    statusCode: number;
    body: unknown;
  }

  export interface NonJsonError {
    reason: 'non-json';
    statusCode: number;
    rawBody: string;
  }

  export interface BodyIsNullError {
    reason: 'body-is-null';
    statusCode: number;
  }

  export interface TimeoutError {
    reason: 'timeout';
    cause?: unknown;
  }

  export interface UnknownError {
    reason: 'unknown';
    errorMessage: string;
    cause?: unknown;
  }
}

/** `Args.url` is already fully resolved (query string included) — `makePassthroughRequest` takes
 * a bare URL string as-is when its `config.baseUrl` is unset, so no resolution happens twice. */
function buildFetcherUrl(args: Fetcher.Args): string {
  if (args.queryString) {
    return `${args.url}?${args.queryString}`;
  }
  if (!args.queryParameters) {
    return args.url;
  }
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(args.queryParameters)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, String(v)));
    } else {
      search.append(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `${args.url}?${query}` : args.url;
}

async function buildFetcherHeaders(args: Fetcher.Args): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};
  if (args.body !== undefined && args.contentType) {
    headers['Content-Type'] = args.contentType;
  }
  // `args.headers` is untyped (`Record<string, unknown>`, matching Fern's own Fetcher.Args) — a
  // value may itself be a Supplier (e.g. populated from a Supplier-typed BaseClientOptions.headers
  // entry), so resolve before stringifying, same as Fern's own getHeaders().
  if (args.headers) {
    for (const [key, value] of Object.entries(args.headers)) {
      const result = await Supplier.get(value as Supplier<unknown>);
      if (result === undefined || result === null) {
        continue;
      }
      headers[key] = typeof result === 'string' ? result : String(result);
    }
  }
  return headers;
}

// A Node `Readable` (`pipe` and `on`) or web `ReadableStream` (`getReader` and `tee`) goes to `fetch`
// as-is instead of being stringified; `fetch` needs `duplex: 'half'` for either, which the caller
// supplies. Both methods are required so a plain object with one stray method is still JSON.
function isStreamBody(body: unknown): boolean {
  if (typeof body !== 'object' || body === null) {
    return false;
  }
  const candidate = body as { pipe?: unknown; on?: unknown; getReader?: unknown; tee?: unknown };
  return (
    (typeof candidate.pipe === 'function' && typeof candidate.on === 'function') ||
    (typeof candidate.getReader === 'function' && typeof candidate.tee === 'function')
  );
}

function userAbortedResult(error: unknown) {
  return {
    ok: false as const,
    error: { reason: 'unknown' as const, errorMessage: 'The user aborted a request', cause: error },
    rawResponse: abortRawResponse,
  };
}

function buildFetcherBody(args: Fetcher.Args): BodyInit | undefined {
  if (args.body === undefined) {
    return undefined;
  }
  // A stream is never JSON, so it goes through whatever the request type says (Fern's default
  // request type passes the body unchanged).
  if (isStreamBody(args.body)) {
    return args.body as BodyInit;
  }
  if (args.requestType === 'json' || args.requestType === undefined) {
    return toJson(args.body);
  }
  if (
    typeof args.body === 'string' ||
    args.body instanceof ArrayBuffer ||
    ArrayBuffer.isView(args.body as ArrayBufferView) ||
    args.body instanceof Blob ||
    args.body instanceof FormData ||
    args.body instanceof URLSearchParams
  ) {
    return args.body as BodyInit;
  }
  return toJson(args.body);
}

/**
 * Carries the raw text that failed `JSON.parse`, since `response.text()` can only be read once —
 * a caller catching a parse failure can't re-read the body to recover it.
 */
class FetcherNonJsonError extends Error {
  constructor(public readonly rawBody: string) {
    super('Failed to parse response body as JSON');
  }
}

function isJsonContentType(contentType: string | null): boolean {
  const mediaType = contentType?.split(';')[0]?.trim().toLowerCase() ?? '';
  return (
    mediaType === 'application/json' || mediaType === 'text/json' || mediaType.endsWith('+json')
  );
}

async function parseFetcherResponseBody(response: Response, args: Fetcher.Args): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }
  if (args.responseType === 'binary-response') {
    return getBinaryResponse(response);
  }
  if (args.responseType === 'blob') {
    return await response.blob();
  }
  if (args.responseType === 'arrayBuffer') {
    return await response.arrayBuffer();
  }
  if (args.responseType === 'text') {
    return await response.text();
  }
  if (args.responseType === 'sse' || args.responseType === 'streaming') {
    // Matches Fern's own getResponseBody: the raw byte stream, not a fully-buffered string — a
    // long-lived SSE/streaming endpoint must not be read to completion before this resolves.
    return response.body ?? undefined;
  }
  const text = await response.text();
  if (text.length === 0) {
    return undefined;
  }
  try {
    return fromJson(text);
  } catch {
    // Only a body the server labelled as JSON is an error here: void endpoints may answer with
    // plain text, and a response with no content type is not labelled JSON (as in Fern's own fetcher).
    if (!isJsonContentType(response.headers.get('content-type'))) {
      return text;
    }
    throw new FetcherNonJsonError(text);
  }
}

/**
 * Translates `Args` into a `makePassthroughRequest` call and its `Response`/thrown-error outcome
 * back into Fern's `APIResponse` Result shape. All retry/timeout/backoff/abort-signal-combination
 * behavior comes from `makePassthroughRequest` itself — the same logic `client.fetch()` uses —
 * not reimplemented here.
 */
export async function fetcherImpl<R = unknown>(
  args: Fetcher.Args,
): Promise<APIResponse<R, Fetcher.Error>> {
  const url = buildFetcherUrl(args);
  const config: PassthroughRequestConfig = {
    timeoutInSeconds: args.timeoutMs !== undefined ? args.timeoutMs / 1000 : undefined,
    maxRetries: args.maxRetries,
    fetch: args.fetchFn,
    logging: args.logging,
  };
  const headers = await buildFetcherHeaders(args);

  let response: Response;
  try {
    response = await makePassthroughRequest(
      url,
      {
        method: args.method,
        headers,
        body: buildFetcherBody(args),
        signal: args.abortSignal,
        credentials: args.withCredentials ? 'include' : undefined,
        duplex: args.duplex,
      } as RequestInit,
      config,
    );
  } catch (error) {
    // Precedence matches Fern's own Fetcher.ts: a caller-supplied abort is reported as "unknown"
    // (not "timeout") when it's the caller's own signal, not this call's timeout, that fired.
    if (args.abortSignal?.aborted) {
      return userAbortedResult(error);
    }
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      return {
        ok: false,
        error: { reason: 'timeout', cause: error },
        rawResponse: abortRawResponse,
      };
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      error: { reason: 'unknown', errorMessage, cause: error },
      rawResponse: unknownRawResponse,
    };
  }

  if (response.status >= 200 && response.status < 400) {
    let body: unknown;
    try {
      body = await parseFetcherResponseBody(response, args);
    } catch (error) {
      if (args.abortSignal?.aborted) {
        return userAbortedResult(error);
      }
      if (
        error instanceof Error &&
        (error.name === 'TimeoutError' || error.name === 'AbortError')
      ) {
        return {
          ok: false,
          error: { reason: 'timeout', cause: error },
          rawResponse: abortRawResponse,
        };
      }
      const rawBody = error instanceof FetcherNonJsonError ? error.rawBody : '';
      return {
        ok: false,
        error: { reason: 'non-json', statusCode: response.status, rawBody },
        rawResponse: toRawResponse(response),
      };
    }
    if (body === undefined && response.status !== 204 && args.responseType !== 'binary-response') {
      return {
        ok: false,
        error: { reason: 'body-is-null', statusCode: response.status },
        rawResponse: toRawResponse(response),
      };
    }
    return { ok: true, body: body as R, rawResponse: toRawResponse(response) };
  }

  let errorBody: unknown;
  try {
    errorBody = await parseFetcherResponseBody(response, args);
  } catch (error) {
    errorBody = error instanceof FetcherNonJsonError ? error.rawBody : undefined;
  }
  return {
    ok: false,
    error: { reason: 'status-code', statusCode: response.status, body: errorBody },
    rawResponse: toRawResponse(response),
  };
}

export const fetcher: FetchFunction = fetcherImpl;
