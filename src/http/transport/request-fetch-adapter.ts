import { VouchsafeApiError } from '../errors/throwable-error';
import { VouchsafeApiTimeoutError } from '../errors/timeout-error';
import { getBinaryResponse } from '../response-promise';
import { ResponseMatcher } from '../utils/response-matcher';
import { toRawResponse } from '../utils/fetcher';
import { ContentType, HttpMetadata, HttpMethod, HttpResponse } from '../types';
import { LineDecoder } from '../utils/line-decoder';
import { Request } from './request';

/**
 * Interface for HTTP client adapters.
 * Defines the contract for sending HTTP requests and streaming responses.
 */
interface HttpAdapter {
  send(): Promise<HttpResponse>;
  stream(): AsyncGenerator<HttpResponse>;
}

interface IdleTimer {
  signal: AbortSignal;
  arm: () => void;
  disarm: () => void;
}

interface StreamSignal {
  signal: AbortSignal;
  release: () => void;
  idleTimer: IdleTimer | undefined;
}

/**
 * Fetch API-based HTTP adapter for executing requests.
 * Uses the native Fetch API to provide a consistent interface for both regular and streaming requests.
 * Handles headers, cookies, timeouts with AbortSignal, and error responses.
 *
 * @template T - The expected response type
 */
/**
 * The per-attempt state `shouldResumeAfterTruncation` reads when a stream is truncated —
 * it closed without ever delivering its spec-declared terminator.
 */
interface TruncationResumeState {
  truncatedResumes: number;
  maxReconnectionAttempts: number;
  streamTerminator: string | undefined;
  terminatorSeen: boolean;
  lastEventId: string | undefined;
}

/**
 * Tracks the SSE `id:` field across frames. Per the WHATWG EventSource spec the last event
 * ID is committed when an event is dispatched, not when the `id:` line is parsed, so
 * reconnection replays `dispatchedId` — replaying a parsed-but-undispatched id would skip an
 * event the caller never received.
 */
interface SseEventIdState {
  pendingId: string | undefined;
  dispatchedId: string | undefined;
  frameHasData: boolean;
}

export class RequestFetchAdapter<T> implements HttpAdapter {
  private requestInit: RequestInit = {};
  private fetchFn: (url: any, init: any) => Promise<Response>;
  // Reused across extractEventId calls instead of allocating one per decoded SSE line.
  private readonly textDecoder = new TextDecoder();
  // Remembered so send() and each stream() reconnect attempt can build a fresh idle timer —
  // a one-shot signal stays aborted forever once it fires once.
  private timeoutMs: number | undefined;

  constructor(private request: Request) {
    this.setMethod(request.method);
    this.setHeaders(request.getHeaders());
    this.setCookies(request.getCookies());
    this.setBody(request.body);
    this.fetchFn = request.config.fetch ?? fetch;
    this.timeoutMs = (request.config.timeoutInSeconds ?? 60) * 1000;
  }

  /**
   * Executes the HTTP request and returns the response.
   * Fetches the full response body as an ArrayBuffer.
   *
   * @returns A promise resolving to the HTTP response with metadata and body
   */
  public async send(): Promise<HttpResponse<T>> {
    const streamSignal = this.buildStreamSignal();
    const idleTimer = streamSignal?.idleTimer;
    const requestInit = streamSignal
      ? { ...this.requestInit, signal: streamSignal.signal }
      : this.requestInit;
    let response: Response;
    idleTimer?.arm();
    try {
      response = await this.fetchFn(this.request.constructFullUrl(), requestInit);
    } catch (error) {
      streamSignal?.release();
      throw this.wrapTransportError(error);
    } finally {
      idleTimer?.disarm();
    }

    const metadata: HttpMetadata = {
      status: response.status,
      statusText: response.statusText || '',
      headers: this.getHeaders(response),
    };

    const responseDefinition = new ResponseMatcher(this.request.responses).getResponseDefinition({
      metadata,
    } as HttpResponse);
    const isBinaryResponse =
      metadata.status < 400 &&
      (responseDefinition?.contentType === ContentType.Binary ||
        responseDefinition?.contentType === ContentType.Image);
    if (isBinaryResponse) {
      return {
        metadata,
        raw: new ArrayBuffer(0),
        binaryResponse: getBinaryResponse(this.withIdleBody(response, streamSignal)),
        rawResponse: toRawResponse(response),
      };
    }
    return {
      metadata,
      raw: await this.withIdleBody(response.clone(), streamSignal).arrayBuffer(),
      rawResponse: toRawResponse(response),
    };
  }

  /**
   * Executes the HTTP request as a stream, yielding chunks as they arrive.
   * Uses the Fetch API's ReadableStream and LineDecoder to split into lines.
   *
   * @returns An async generator yielding HTTP response chunks
   * @throws Error if responseHeaders is enabled (streaming not supported with responseHeaders)
   */
  public async *stream(): AsyncGenerator<HttpResponse<T>> {
    const streamConfig = this.request.config.stream;
    const resumable =
      this.request.eventShape?.type === 'sse' && this.request.eventShape.resumable === true;
    const streamTerminator =
      this.request.eventShape?.type === 'sse'
        ? this.request.eventShape.streamTerminator
        : undefined;
    const maxReconnectionAttempts =
      resumable && (streamConfig?.reconnectionEnabled ?? true)
        ? Math.max(0, streamConfig?.maxReconnectionAttempts ?? 5)
        : 0;
    const eventIdState: SseEventIdState = {
      pendingId: undefined,
      dispatchedId: undefined,
      frameHasData: false,
    };
    let serverRetryMs: number | undefined;
    let terminatorSeen = false;
    let truncatedResumes = 0;
    let releaseStreamSignal: () => void = () => undefined;

    try {
      for (let attempt = 0; ; attempt++) {
        releaseStreamSignal();
        if (attempt > 0 && this.request.config.abortSignal?.aborted) {
          return;
        }

        if (eventIdState.dispatchedId) {
          this.addRequestHeader('Last-Event-ID', eventIdState.dispatchedId);
        }
        // A one-shot timeout signal stays aborted forever once it fires — rebuild it fresh for
        // every attempt, or a reconnect after a timeout would reject instantly every time.
        const streamSignal = this.buildStreamSignal();
        const idleTimer = streamSignal?.idleTimer;
        if (streamSignal !== undefined) {
          releaseStreamSignal = streamSignal.release;
          this.requestInit = { ...this.requestInit, signal: streamSignal.signal };
        }

        let response: Response;
        idleTimer?.arm();
        try {
          response = await this.fetchFn(this.request.constructFullUrl(), this.requestInit);
          idleTimer?.disarm();
        } catch (error) {
          idleTimer?.disarm();
          if (this.request.config.abortSignal?.aborted) {
            if (attempt === 0) {
              throw this.wrapTransportError(error);
            }
            return;
          }
          if (attempt < maxReconnectionAttempts) {
            await this.delay(this.calculateReconnectionDelay(serverRetryMs));
            continue;
          }
          throw this.wrapTransportError(error);
        }

        const metadata: HttpMetadata = {
          status: response.status,
          statusText: response.statusText || '',
          headers: this.getHeaders(response),
        };

        if (response.status >= 400) {
          return yield {
            metadata,
            raw: await response.clone().arrayBuffer(),
            rawResponse: toRawResponse(response),
          };
        }

        this.request.onStreamOpen?.(toRawResponse(response));

        if (!response.body) {
          return yield {
            metadata,
            raw: await response.clone().arrayBuffer(),
            rawResponse: toRawResponse(response),
          };
        }

        const reader = response.body.getReader();
        const lineDecoder = new LineDecoder();
        let resumeAfterTruncation = false;

        try {
          while (true) {
            idleTimer?.arm();
            const { done, value } = await reader.read();
            idleTimer?.disarm();
            if (done) {
              for (const line of lineDecoder.flush()) {
                this.trackEventId(line, eventIdState);
                terminatorSeen = terminatorSeen || this.isTerminatorLine(line, streamTerminator);
                yield {
                  metadata,
                  raw: this.toArrayBuffer(line),
                };
              }
              this.commitDispatchedEventId(eventIdState);
              resumeAfterTruncation = this.shouldResumeAfterTruncation({
                truncatedResumes,
                maxReconnectionAttempts,
                streamTerminator,
                terminatorSeen,
                lastEventId: eventIdState.dispatchedId,
              });
              if (resumeAfterTruncation) {
                truncatedResumes += 1;
              }
              break;
            }

            for (const line of lineDecoder.splitLines(value)) {
              this.trackEventId(line, eventIdState);
              serverRetryMs = this.extractRetryMs(line) ?? serverRetryMs;
              terminatorSeen = terminatorSeen || this.isTerminatorLine(line, streamTerminator);
              attempt = 0;
              yield {
                metadata,
                raw: this.toArrayBuffer(line),
              };
            }
          }
        } catch (error) {
          // A transport drop mid-stream: reconnect (carrying Last-Event-ID) up to the configured
          // limit, matching the fetch()-rejection retry above. A server that ignores Last-Event-ID
          // will simply re-send from the start.
          if (this.request.config.abortSignal?.aborted) {
            return;
          }
          if (attempt >= maxReconnectionAttempts) {
            throw this.wrapTransportError(error);
          }
          await this.delay(this.calculateReconnectionDelay(serverRetryMs));
          continue;
        } finally {
          await reader.cancel().catch(() => undefined);
        }

        if (!resumeAfterTruncation) {
          return;
        }
        await this.delay(this.calculateReconnectionDelay(serverRetryMs));
      }
    } finally {
      releaseStreamSignal();
    }
  }

  private setMethod(method: HttpMethod): void {
    if (!method) {
      return;
    }
    this.requestInit = {
      ...this.requestInit,
      method,
    };
  }

  private setBody(body: ReadableStream<Uint8Array> | null): void {
    if (!body) {
      return;
    }
    this.requestInit = {
      ...this.requestInit,
      body,
    };
  }

  private setHeaders(headers: HeadersInit | undefined): void {
    if (!headers) {
      return;
    }

    this.requestInit = {
      ...this.requestInit,
      headers,
    };
  }

  private setCookies(cookies: Record<string, string> | undefined): void {
    if (!cookies || Object.keys(cookies).length === 0) {
      return;
    }

    // Serialize cookies as a Cookie header
    const cookieString = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit.headers,
        Cookie: cookieString,
      },
    };
  }

  private getHeaders(response: Response): Record<string, string> {
    const headers: Record<string, string> = {};
    response.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });

    return headers;
  }

  private toArrayBuffer(uint8Array: Uint8Array): ArrayBuffer {
    return new Uint8Array(uint8Array).buffer;
  }

  /**
   * Merges a single header into the request, preserving headers already set (auth, User-Agent,
   * cookies, …) — unlike `setHeaders`, which replaces the whole header set.
   */
  private addRequestHeader(key: string, value: string): void {
    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit.headers,
        [key]: value,
      },
    };
  }

  /**
   * Combines the caller's `abortSignal` with this request's timeout signal so the stream aborts
   * when either fires. `AbortSignal.any` is not used because the supported TypeScript
   * `lib.dom.d.ts` does not declare it. The returned `release` aborts the combined controller, which
   * is what unregisters the listeners — a clean finish never aborts it on its own, so callers must
   * invoke `release` or the caller's signal accumulates one listener per stream.
   */
  private buildStreamSignal(): StreamSignal | undefined {
    const callerSignal = this.request.config.abortSignal;
    const idleTimer = this.createIdleTimer();
    const timeoutSignal = idleTimer?.signal;
    const disarm = (): void => idleTimer?.disarm();

    if (!callerSignal || !timeoutSignal) {
      const signal = callerSignal ?? timeoutSignal;
      return signal === undefined ? undefined : { signal, idleTimer, release: disarm };
    }

    const controller = new AbortController();
    for (const signal of [callerSignal, timeoutSignal]) {
      if (signal.aborted) {
        controller.abort(signal.reason);
        return { signal: controller.signal, idleTimer, release: disarm };
      }
      signal.addEventListener('abort', () => controller.abort(signal.reason), {
        signal: controller.signal,
      });
    }
    return {
      signal: controller.signal,
      idleTimer,
      release: () => {
        disarm();
        controller.abort();
      },
    };
  }

  private createIdleTimer(): IdleTimer | undefined {
    const timeoutMs = this.timeoutMs;
    if (timeoutMs === undefined) {
      return undefined;
    }
    const controller = new AbortController();
    let handle: ReturnType<typeof setTimeout> | undefined;
    const disarm = (): void => {
      if (handle !== undefined) {
        clearTimeout(handle);
        handle = undefined;
      }
    };
    const arm = (): void => {
      disarm();
      handle = setTimeout(
        () => controller.abort(new DOMException('The operation timed out.', 'TimeoutError')),
        timeoutMs,
      );
    };
    return { signal: controller.signal, arm, disarm };
  }

  private withIdleBody(response: Response, streamSignal: StreamSignal | undefined): Response {
    const idleTimer = streamSignal?.idleTimer;
    if (streamSignal === undefined || idleTimer === undefined || response.body === null) {
      streamSignal?.release();
      return response;
    }
    const reader = response.body.getReader();
    const body = new ReadableStream<Uint8Array>(
      {
        pull: async (controller) => {
          idleTimer.arm();
          try {
            const { done, value } = await reader.read();
            idleTimer.disarm();
            if (done) {
              streamSignal.release();
              controller.close();
              return;
            }
            controller.enqueue(value);
          } catch (error) {
            idleTimer.disarm();
            streamSignal.release();
            controller.error(this.wrapTransportError(error));
          }
        },
        cancel: async (reason) => {
          idleTimer.disarm();
          try {
            await reader.cancel(reason);
          } finally {
            streamSignal.release();
          }
        },
      },
      { highWaterMark: 0 },
    );
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  /**
   * Classifies a fetch() rejection: the idle timeout firing surfaces as a `TimeoutError`
   * (or, in some runtimes, `AbortError`) DOMException. A caller-supplied `abortSignal` can also
   * abort here, so an abort is only reported as a timeout when the caller's signal did not fire.
   * Anything else is wrapped as a generic base error with `cause` set.
   */
  private wrapTransportError(error: unknown): Error {
    const abortedByCaller = this.request.config.abortSignal?.aborted === true;
    const errorName =
      typeof error === 'object' && error !== null && 'name' in error
        ? String((error as { name: unknown }).name)
        : undefined;
    if (!abortedByCaller && (errorName === 'TimeoutError' || errorName === 'AbortError')) {
      return new VouchsafeApiTimeoutError(
        `Timeout exceeded when calling ${this.request.method} ${this.request.path}.`,
        { cause: error },
      );
    }
    return new VouchsafeApiError({
      message: error instanceof Error ? error.message : 'Unknown error',
      cause: error,
    });
  }

  private commitDispatchedEventId(state: SseEventIdState): void {
    if (!state.frameHasData) {
      return;
    }
    state.dispatchedId = state.pendingId ?? state.dispatchedId;
    state.frameHasData = false;
  }

  private trackEventId(line: Uint8Array, state: SseEventIdState): void {
    const decoded = new TextDecoder().decode(line);
    if (decoded.trim().length === 0) {
      this.commitDispatchedEventId(state);
      return;
    }
    if (decoded.startsWith('data:')) {
      state.frameHasData = true;
      return;
    }
    const parsedId = this.extractEventId(line);
    if (parsedId !== undefined) {
      state.pendingId = parsedId;
    }
  }

  private isTerminatorLine(line: Uint8Array, streamTerminator?: string): boolean {
    if (streamTerminator === undefined) {
      return false;
    }
    const decoded = new TextDecoder().decode(line);
    if (!decoded.startsWith('data:')) {
      return false;
    }
    return decoded.slice('data:'.length).replace(/^ /, '').trim() === streamTerminator;
  }

  private shouldResumeAfterTruncation(state: TruncationResumeState): boolean {
    if (state.streamTerminator === undefined || state.terminatorSeen) {
      return false;
    }
    if (state.truncatedResumes >= state.maxReconnectionAttempts) {
      return false;
    }
    if (!state.lastEventId) {
      return false;
    }
    return this.request.config.abortSignal?.aborted !== true;
  }

  /**
   * Reads an SSE `id` field from a decoded line, for `Last-Event-ID` on reconnect. A bare `id`
   * line (no colon) is spec-legal and resets the id to an empty string, distinct from a line
   * that isn't an id field at all (which leaves the previous id unchanged — see call sites'
   * `?? lastEventId`). Strips any CR/LF from the value before it's later injected into a request
   * header, since the id is server-controlled and the line decoder only splits on `\n` (a lone
   * `\r` could otherwise survive into the header value). An id containing NUL is ignored, per
   * the SSE spec.
   * @param line - A single decoded line (with trailing newline) from the line decoder
   * @returns The event id (possibly empty), or undefined if this line isn't an `id` field
   */
  private extractEventId(line: Uint8Array): string | undefined {
    const text = this.textDecoder.decode(line).trim();
    if (text === 'id') {
      return '';
    }
    if (!text.startsWith('id:')) {
      return undefined;
    }
    const idValue = text
      .slice('id:'.length)
      .trim()
      .replace(/[\r\n]/g, '');
    return idValue.includes('\0') ? undefined : idValue;
  }

  private extractRetryMs(line: Uint8Array): number | undefined {
    const decoded = new TextDecoder().decode(line);
    if (!decoded.startsWith('retry:')) {
      return undefined;
    }
    const retryValue = decoded.slice('retry:'.length).trim();
    const parsed = parseInt(retryValue, 10);
    return !Number.isNaN(parsed) && String(parsed) === retryValue ? parsed : undefined;
  }

  private calculateReconnectionDelay(serverRetryMs?: number): number {
    const base = serverRetryMs !== undefined && serverRetryMs > 0 ? serverRetryMs : 1000;
    return Math.min(base, 30000);
  }

  private delay(delayMs: number): Promise<void> {
    const abortSignal = this.request.config.abortSignal;
    if (abortSignal?.aborted) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const onAbort = (): void => {
        clearTimeout(timer);
        resolve();
      };
      const timer = setTimeout(() => {
        abortSignal?.removeEventListener('abort', onAbort);
        resolve();
      }, delayMs);
      abortSignal?.addEventListener('abort', onAbort, { once: true });
    });
  }
}
