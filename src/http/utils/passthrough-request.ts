import { Supplier, resolveHeaders } from './supplier';
import type { core } from '../types';
import { LogConfig, Logger, sanitizeLogUrl, formatLogHeaders } from './logger';

// Every unqualified `Request` in this file is the global fetch `Request`, not the transport
// `Request` class (`../transport/request`) — this file never imports that one, but importing it
// later would silently shadow every `instanceof Request` check below.

const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_DELAY_MS = 150;
const DEFAULT_MAX_DELAY_MS = 5000;
const DEFAULT_BACKOFF_FACTOR = 2;
const DEFAULT_JITTER_MS = 50;
const MAX_RETRY_AFTER_DELAY_MS = 60000;
const RETRYABLE_STATUS_CODES = [408, 429];

/**
 * The subset of the SDK's resolved `BaseClientOptions` that `makePassthroughRequest` needs. A
 * narrow local shape rather than an import of the generated config interface, so this file stays
 * a static, non-templated utility like `supplier.ts`.
 */
export interface PassthroughRequestConfig {
  baseUrl?: Supplier<string>;
  headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
  /** Pre-resolved auth header values (undefined entries are dropped, not sent as `"undefined"`). */
  authHeaders?: Record<string, string | undefined>;
  /**
   * The URLs of the selected multi-URL environment (one entry per named host, e.g. `base` and
   * `agent`). Credentials also go to these hosts, so an absolute URL on a second host of the same
   * API is authenticated; `ws`/`wss` URLs stand for the `http`/`https` origin of the same host.
   */
  environmentUrls?: object;
  timeoutInSeconds?: number;
  maxRetries?: number;
  // Deliberately looser than `typeof fetch` (Fern's own shape), matching BaseClientOptions.fetch
  // — see build-sdk-config.ts — so a caller-supplied wrapper (e.g. node-fetch) doesn't need to
  // satisfy the stricter overloads.
  fetch?: (url: any, init: any) => Promise<Response>;
  logging?: LogConfig | Logger;
}

/**
 * Escape hatch for calling an endpoint the generated SDK doesn't wrap: resolves `input` against
 * the SDK's configured baseUrl, applies the SDK's default headers/auth/timeout/retry policy, and
 * returns the raw `Response` — no request or response schema validation.
 *
 * Header priority (later wins): SDK default headers -> auth headers (only for the baseUrl's origin
 * and the selected environment's origins, so credentials never leak to a host outside the API;
 * a request to any other host goes out without them and a warning is logged) -> `init.headers` ->
 * `requestOptions.headers`.
 */
export async function makePassthroughRequest(
  input: Request | string | URL,
  init: RequestInit | undefined,
  config: PassthroughRequestConfig,
  requestOptions?: core.PassthroughRequest.RequestOptions,
): Promise<Response> {
  const baseUrl = await Supplier.get(config.baseUrl);
  const resolvedInput = resolvePassthroughInput(input, baseUrl);
  const resolvedUrl = passthroughInputUrl(resolvedInput);

  const log = Logger.from(config.logging);

  const headers = new Headers();
  mergeHeadersInto(headers, await resolveHeaders(config.headers));
  if (isTrustedOrigin(resolvedUrl, baseUrl, config.environmentUrls)) {
    mergeHeadersInto(headers, config.authHeaders);
  } else if (hasCredentials(config.authHeaders) && log.isWarn()) {
    log.warn(
      `HTTP Request: credentials not sent to ${describeOrigin(resolvedUrl)}: it is not a host of this client's baseUrl or environment. Create a client whose baseUrl is that host to send them.`,
    );
  }
  if (resolvedInput instanceof Request) {
    mergeHeadersInto(headers, resolvedInput.headers);
  }
  mergeHeadersInto(headers, init?.headers);
  mergeHeadersInto(headers, await resolveHeaders(requestOptions?.headers));

  const timeoutInSeconds = requestOptions?.timeoutInSeconds ?? config.timeoutInSeconds;
  const timeoutMs = timeoutInSeconds !== undefined ? timeoutInSeconds * 1000 : undefined;

  // A caller-supplied `maxRetries` doesn't override safety: an unreplayable body still caps
  // attempts at 1, it just isn't the reason maxAttempts was computed.
  const maxRetries = requestOptions?.maxRetries ?? config.maxRetries;
  const requestedMaxAttempts =
    maxRetries !== undefined ? Math.max(1, Math.trunc(maxRetries) + 1) : DEFAULT_MAX_ATTEMPTS;
  const maxAttempts = isReplayableRequest(resolvedInput, init) ? requestedMaxAttempts : 1;
  const fetchImpl = config.fetch ?? fetch;

  const logUrl = sanitizeLogUrl(resolvedUrl);
  const method = resolvedInput instanceof Request ? resolvedInput.method : (init?.method ?? 'GET');

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    // A `Request` input's body stream is consumed by fetch() — clone the pristine original
    // (never itself passed to fetch) fresh for every attempt, including the first.
    const requestInput = resolvedInput instanceof Request ? resolvedInput.clone() : resolvedInput;

    // A one-shot AbortSignal.timeout() stays aborted forever once it fires — rebuild the whole
    // composed signal fresh per attempt, or a retry after a timeout would reject instantly.
    const timeoutSignal = timeoutMs !== undefined ? AbortSignal.timeout(timeoutMs) : undefined;
    const { signal, dispose } = combinePassthroughSignals(
      init?.signal ?? undefined,
      requestOptions?.abortSignal,
      timeoutSignal,
    );

    if (log.isDebug()) {
      log.debug(`HTTP Request: ${method} ${logUrl} headers=${formatLogHeaders(headers)}`);
    }

    let response: Response;
    try {
      try {
        response = await fetchImpl(requestInput, { ...init, headers, signal });
      } catch (error) {
        if (attempt === maxAttempts) {
          if (log.isError()) {
            log.error(
              `HTTP Error: ${error instanceof Error ? error.message : String(error)} url=${logUrl}`,
            );
          }
          throw error;
        }
        const delayMs = calculatePassthroughBackoff(attempt);
        if (log.isWarn()) {
          log.warn(
            `HTTP Retry: attempt=${attempt} delayMs=${delayMs} url=${logUrl} reason=${error instanceof Error ? error.message : String(error)}`,
          );
        }
        await passthroughDelay(delayMs);
        continue;
      }

      // `response.url` reflects the final URL after any redirects — falls back to the
      // pre-request `logUrl` for responses where it's empty (e.g. some opaque/no-cors cases).
      // Lazy so it's only computed when a log line actually fires.
      const responseUrl = (): string => (response.url ? sanitizeLogUrl(response.url) : logUrl);

      if (log.isDebug()) {
        log.debug(
          `HTTP Response: status=${response.status} url=${responseUrl()} headers=${formatLogHeaders(response.headers)}`,
        );
      }

      const shouldRetryStatus =
        response.status >= 500 || RETRYABLE_STATUS_CODES.includes(response.status);
      if (!shouldRetryStatus || attempt === maxAttempts) {
        if (response.status >= 400 && log.isError()) {
          log.error(`HTTP Error: status=${response.status} url=${responseUrl()}`);
        }
        return response;
      }
      const delayMs = (() => {
        const retryAfterMs = parseRetryAfterMs(response);
        return retryAfterMs !== undefined
          ? Math.min(retryAfterMs, MAX_RETRY_AFTER_DELAY_MS)
          : calculatePassthroughBackoff(attempt);
      })();
      if (log.isWarn()) {
        log.warn(
          `HTTP Retry: attempt=${attempt} delayMs=${delayMs} url=${responseUrl()} reason=status=${response.status}`,
        );
      }
      await passthroughDelay(delayMs);
    } finally {
      dispose();
    }
  }
  throw new Error('Passthrough request failed after retrying.');
}

/**
 * Whether it's safe to send the same request body across multiple retry attempts. A `Request`
 * input is always safe — a fresh `.clone()` is taken per attempt. A non-`Request` `init.body`
 * must be a replayable type (not an already-partially-read stream) for a retry to be safe.
 */
function isReplayableRequest(
  input: Request | string | URL,
  init: RequestInit | undefined,
): boolean {
  if (input instanceof Request) {
    return true;
  }
  const body = init?.body;
  return (
    body === null ||
    body === undefined ||
    typeof body === 'string' ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body)
  );
}

/** Parses a response's `Retry-After` header (seconds or an HTTP-date) into a millisecond delay. */
function parseRetryAfterMs(response: Response): number | undefined {
  const value = response.headers.get('Retry-After');
  if (!value) {
    return undefined;
  }
  const seconds = Number(value);
  if (!Number.isNaN(seconds)) {
    return Math.max(0, seconds * 1000);
  }
  const dateMs = Date.parse(value);
  return Number.isNaN(dateMs) ? undefined : Math.max(0, dateMs - Date.now());
}

/**
 * Resolves a relative `string` input against `baseUrl`; `URL` and `Request` pass through
 * unchanged. Absolute strings (including protocol-relative `//host/path`) are also left to
 * `new URL`'s own resolution — it already returns an absolute input untouched and joins a
 * protocol-relative one onto `baseUrl`'s scheme, so there's no need to hand-roll that check.
 */
function resolvePassthroughInput(
  input: Request | string | URL,
  baseUrl: string | undefined,
): Request | string | URL {
  if (typeof input !== 'string' || !baseUrl) {
    return input;
  }
  return new URL(input, baseUrl).toString();
}

function passthroughInputUrl(input: Request | string | URL): string {
  if (typeof input === 'string') {
    return input;
  }
  return input instanceof URL ? input.toString() : input.url;
}

/** `scheme://host[:port]` of an absolute URL; `ws`/`wss` map to `http`/`https` when asked to. */
function originOf(url: string, mapSocketSchemes = false): string | undefined {
  try {
    const parsed = new URL(url);
    if (!parsed.host) {
      return undefined;
    }
    const protocol = mapSocketSchemes
      ? parsed.protocol.replace(/^ws(s?):$/, 'http$1:')
      : parsed.protocol;
    return `${protocol}//${parsed.host}`;
  } catch {
    return undefined;
  }
}

function isTrustedOrigin(
  url: string,
  baseUrl: string | undefined,
  environmentUrls: object | undefined,
): boolean {
  const origin = originOf(url);
  if (!origin) {
    return false;
  }
  const environmentValues: unknown[] = Object.values(environmentUrls ?? {});
  return [baseUrl, ...environmentValues].some(
    (trusted) => typeof trusted === 'string' && originOf(trusted, true) === origin,
  );
}

function hasCredentials(authHeaders: Record<string, string | undefined> | undefined): boolean {
  return Object.values(authHeaders ?? {}).some((value) => value !== undefined && value !== '');
}

function describeOrigin(url: string): string {
  return originOf(url) ?? sanitizeLogUrl(url);
}

function mergeHeadersInto(
  target: Headers,
  source: HeadersInit | Record<string, string | undefined> | undefined,
): void {
  if (!source) {
    return;
  }
  const entries: Iterable<[string, string | undefined]> =
    source instanceof Headers
      ? source.entries()
      : Array.isArray(source)
        ? source
        : Object.entries(source);
  for (const [key, value] of entries) {
    if (value !== undefined && value !== null) {
      target.set(key, value);
    }
  }
}

/**
 * Combines any number of caller/internal signals (a raw `RequestInit.signal`, `requestOptions.
 * abortSignal`, an internally-computed timeout signal) into one signal that aborts when any of
 * them fires — so a caller-supplied `init.signal` isn't silently dropped just because the SDK
 * also has its own timeout/abort inputs to account for. `AbortSignal.any` isn't used since this
 * repo's supported TypeScript `lib.dom.d.ts` doesn't declare it; this listener-based version is
 * equivalent.
 */
function combinePassthroughSignals(...signals: (AbortSignal | undefined)[]): {
  signal: AbortSignal | undefined;
  dispose: () => void;
} {
  const present = signals.filter((s): s is AbortSignal => s !== undefined);
  if (present.length === 0) {
    return { signal: undefined, dispose: () => {} };
  }
  if (present.length === 1) {
    return { signal: present[0], dispose: () => {} };
  }

  const controller = new AbortController();
  const listeners = present.map((signal) => {
    const listener = () => controller.abort(signal.reason);
    signal.addEventListener('abort', listener, { once: true });
    if (signal.aborted) {
      controller.abort(signal.reason);
    }
    return { signal, listener };
  });
  return {
    signal: controller.signal,
    dispose: () => {
      listeners.forEach(({ signal, listener }) => signal.removeEventListener('abort', listener));
    },
  };
}

/** Exponential backoff with jitter, matching RetryHandler's defaults (see retry-handler.ejs). */
function calculatePassthroughBackoff(attempt: number): number {
  const delayMs = Math.min(
    DEFAULT_DELAY_MS * Math.pow(DEFAULT_BACKOFF_FACTOR, attempt - 1),
    DEFAULT_MAX_DELAY_MS,
  );
  return Math.floor(delayMs + Math.random() * DEFAULT_JITTER_MS);
}

function passthroughDelay(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}
