import { RawResponse } from '../utils/fetcher';

/**
 * Base class for every error thrown by this SDK.
 * Exposes the HTTP status code, response body, raw response metadata, and (when available)
 * the underlying cause, plus a `requestId` getter read from the `x-request-id` response header.
 */
export class VouchsafeApiError extends Error {
  public readonly statusCode?: number;
  public readonly body?: unknown;
  public readonly rawResponse?: RawResponse;
  public readonly cause?: unknown;

  constructor(opts: {
    message?: string;
    statusCode?: number;
    body?: unknown;
    rawResponse?: RawResponse;
    cause?: unknown;
  }) {
    super(buildMessage(opts));
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'VouchsafeApiError';
    this.statusCode = opts.statusCode;
    this.body = opts.body;
    this.rawResponse = opts.rawResponse;
    if (opts.cause != null) {
      this.cause = opts.cause;
    }
  }

  /**
   * The `X-Request-Id` response header, else the first header whose name ends in `request-id` or
   * `request_id` (any case), as in Fern's error class.
   */
  get requestId(): string | undefined {
    const headers = this.rawResponse?.headers;
    if (headers == null) {
      return undefined;
    }
    const requestId = headers.get('X-Request-Id');
    if (requestId != null) {
      return requestId;
    }
    let fallback: string | undefined;
    headers.forEach((value, name) => {
      if (fallback === undefined && /request[-_]?id$/i.test(name)) {
        fallback = value;
      }
    });
    return fallback;
  }
}

function buildMessage(opts: { message?: string; statusCode?: number; body?: unknown }): string {
  const lines: string[] = [];
  if (opts.message != null) {
    lines.push(opts.message);
  }
  if (opts.statusCode != null) {
    lines.push(`Status code: ${opts.statusCode}`);
  }
  if (opts.body != null) {
    lines.push(`Body: ${JSON.stringify(opts.body, undefined, 2)}`);
  }
  return lines.join('\n');
}
