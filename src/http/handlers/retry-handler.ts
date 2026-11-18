import { Request } from '../transport/request';
import { HttpResponse, RequestHandler, HttpMethod } from '../types';
import { VouchsafeApiError } from '../errors/throwable-error';
import { Logger, sanitizeLogUrl } from '../utils/logger';

/**
 * Request handler that automatically retries failed requests.
 * Supports configurable retry attempts, exponential backoff with jitter, and specific status codes or HTTP methods to retry.
 */
export class RetryHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request with retry logic.
   * Retries failed requests based on the configured retry settings.
   * Implements exponential backoff with optional jitter between retry attempts.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set, or if all retry attempts fail
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in retry handler.');
    }

    const maxAttempts = this.resolveMaxAttempts(request);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await this.next.handle<T>(request);
      } catch (error: any) {
        if (!this.shouldRetry(error, request) || attempt === maxAttempts) {
          throw error;
        }
        const delayMs = this.calculateDelay(attempt, request, error);
        this.logRetry(request, attempt, delayMs, error);
        await this.delay(delayMs);
      }
    }

    throw new Error('Error retrying request.');
  }

  /**
   * Handles a streaming HTTP request with retry logic.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set, or if all retry attempts fail
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in retry handler.');
    }

    const maxAttempts = this.resolveMaxAttempts(request);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        yield* this.next.stream<T>(request);
        return;
      } catch (error: any) {
        if (!this.shouldRetry(error, request) || attempt === maxAttempts) {
          throw error;
        }
        const delayMs = this.calculateDelay(attempt, request, error);
        this.logRetry(request, attempt, delayMs, error);
        await this.delay(delayMs);
      }
    }

    throw new Error('Error retrying request.');
  }

  /**
   * Resolves the maximum number of attempts (initial call + retries) from the retry config.
   * `retry.attempts` takes precedence when both are set; `maxRetries` (Fern parity — a retry
   * *count*, not a total-attempts count) is converted with a `+ 1` for the initial call.
   * @param request - The HTTP request being retried
   * @returns The maximum number of attempts
   */
  private resolveMaxAttempts(request: Request): number {
    if (request.config.retry?.attempts !== undefined) {
      return request.config.retry.attempts;
    }
    if (request.config.maxRetries !== undefined) {
      return request.config.maxRetries + 1;
    }
    return 3;
  }

  /**
   * Logs a retry decision via the SDK's configured logger (see `BaseClientOptions.logging`).
   * @param request - The HTTP request being retried
   * @param attempt - The attempt number that just failed (1-indexed)
   * @param delayMs - The computed backoff delay before the next attempt
   * @param error - The error that triggered the retry
   */
  private logRetry(request: Request, attempt: number, delayMs: number, error: unknown): void {
    const log = Logger.from(request.config.logging);
    if (!log.isWarn()) {
      return;
    }
    const reason = error instanceof Error ? error.message : String(error);
    log.warn(
      `HTTP Retry: attempt=${attempt} delayMs=${delayMs} url=${sanitizeLogUrl(request.constructFullUrl())} reason=${reason}`,
    );
  }

  /**
   * Determines if an error should trigger a retry.
   * Checks both HTTP status codes and HTTP methods against the configured retry settings.
   * By default, retries all 5xx server errors and specific 4xx client errors (408 Timeout, 429 Rate Limit).
   * @param error - The error to check
   * @param request - The HTTP request being retried
   * @returns True if the request should be retried, false otherwise
   */
  private shouldRetry(error: Error, request: Request): boolean {
    if (!(error instanceof VouchsafeApiError)) {
      return false;
    }

    const httpMethodsToRetry = request.config.retry?.httpMethodsToRetry ?? [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'HEAD',
      'OPTIONS',
    ];

    const status = error.statusCode ?? 0;
    const shouldRetryStatus = request.config.retry?.statusCodesToRetry
      ? request.config.retry.statusCodesToRetry.includes(status)
      : status >= 500 || [408, 429].includes(status);

    const shouldRetryMethod = httpMethodsToRetry.includes(request.method as HttpMethod);

    return shouldRetryStatus && shouldRetryMethod;
  }

  /**
   * Calculates the delay before the next retry attempt. A server rate-limit timing header
   * (Retry-After / X-RateLimit-Reset) on the error, when present, overrides the computed
   * exponential backoff; otherwise falls back to exponential backoff with optional jitter.
   * @param attempt - The current retry attempt number (1-indexed)
   * @param request - The HTTP request being retried
   * @param error - The error that triggered the retry (carries the response headers)
   * @returns The delay in milliseconds, capped at the configured maximum delay
   */
  private calculateDelay(attempt: number, request: Request, error?: VouchsafeApiError): number {
    const maxRetryAfterDelay = request.config.retry?.maxRetryAfterDelayMs ?? 60000;
    const headerDelay = this.retryAfterDelay(error, maxRetryAfterDelay);
    if (headerDelay !== null) {
      return Math.floor(headerDelay);
    }

    const baseDelay = request.config.retry?.delayMs ?? 1000;
    const backoffFactor = request.config.retry?.backoffFactor ?? 2;
    const maxDelay = request.config.retry?.maxDelayMs ?? 60000;
    const jitter = request.config.retry?.jitterMs ?? 50;

    // Calculate exponential backoff: initialDelay * (backoffFactor ^ (attempt - 1))
    let delay = baseDelay * Math.pow(backoffFactor, attempt - 1);

    // Cap at max delay
    delay = Math.min(delay, maxDelay);

    // Add jitter: random value between 0 and jitter
    if (jitter > 0) {
      delay += Math.random() * jitter;
    }

    return Math.floor(delay);
  }

  /**
   * Returns the server-directed retry delay (ms) from rate-limit response headers,
   * honoring Retry-After (delta-seconds or HTTP-date) and, when absent, X-RateLimit-Reset
   * (epoch seconds), clamped to maxRetryAfterDelayMs. Returns null when no usable header is
   * present so the caller falls back to the computed exponential backoff.
   * @param error - The error that triggered the retry (carries the response headers)
   * @param maxRetryAfterDelayMs - Upper bound for a server-directed delay
   * @returns The delay in milliseconds, or null to use exponential backoff
   */
  private retryAfterDelay(
    error: VouchsafeApiError | undefined,
    maxRetryAfterDelayMs: number,
  ): number | null {
    const headers = error?.rawResponse?.headers;
    if (!headers || maxRetryAfterDelayMs <= 0) {
      return null;
    }
    // `headers` is a real `Headers` instance under fernMode (matching Fern's own
    // `RawResponse` shape).
    const getHeader = (name: string): string | undefined => headers.get(name) ?? undefined;

    // retry-after-ms (milliseconds) is a non-standard but finer-grained hint some APIs send
    // (e.g. OpenAI); it takes precedence over the whole-second Retry-After.
    const retryAfterMs = getHeader('retry-after-ms');
    if (retryAfterMs !== undefined && /^\d+(\.\d+)?$/.test(retryAfterMs.trim())) {
      return Math.min(Number(retryAfterMs.trim()), maxRetryAfterDelayMs);
    }

    const seconds = this.parseRetryAfter(getHeader('retry-after'));
    if (seconds !== null) {
      return Math.min(Math.max(seconds * 1000, 0), maxRetryAfterDelayMs);
    }

    // X-RateLimit-Reset is interpreted as epoch seconds (the common convention).
    const reset = getHeader('x-ratelimit-reset');
    if (reset !== undefined && reset.trim() !== '') {
      const epoch = Number(reset);
      if (Number.isFinite(epoch)) {
        const deltaMs = epoch * 1000 - Date.now();
        if (deltaMs > 0) {
          return Math.min(deltaMs, maxRetryAfterDelayMs);
        }
      }
    }

    return null;
  }

  /**
   * Parses a Retry-After header value: an integer/float number of seconds, or an HTTP-date
   * (a past date yields 0). Returns the delay in seconds, or null if empty/unparseable.
   * @param value - The raw Retry-After header value
   * @returns The delay in seconds, or null
   */
  private parseRetryAfter(value: string | undefined): number | null {
    if (value === undefined) {
      return null;
    }
    const trimmed = value.trim();
    if (trimmed === '') {
      return null;
    }
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      return Number(trimmed);
    }
    const dateMs = Date.parse(trimmed);
    if (!Number.isNaN(dateMs)) {
      const deltaSeconds = (dateMs - Date.now()) / 1000;
      return deltaSeconds > 0 ? deltaSeconds : 0;
    }
    return null;
  }

  /**
   * Delays execution for a specified duration before retrying.
   * @param delayMs - The delay in milliseconds
   * @returns A promise that resolves after the delay
   */
  private delay(delayMs: number): Promise<void> {
    if (delayMs <= 0) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), delayMs);
    });
  }
}
