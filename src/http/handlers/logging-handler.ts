import { Request } from '../transport/request';
import { HttpResponse, RequestHandler } from '../types';
import { Logger, sanitizeLogUrl, formatLogHeaders } from '../utils/logger';

/**
 * Request handler that logs HTTP requests, responses, and errors via the SDK's configured
 * logger (see `BaseClientOptions.logging`). Sits inside `RetryHandler`, so every retry attempt
 * gets its own request/response/error log entries; `RetryHandler` itself logs the retry decision.
 * Sensitive headers and query-string credentials are redacted before logging.
 */
export class LoggingHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request, logging its start, response, and any error.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set, or propagates errors from next handler
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in logging handler.');
    }

    const log = Logger.from(request.config.logging);
    const url = sanitizeLogUrl(request.constructFullUrl());

    if (log.isDebug()) {
      log.debug(
        `HTTP Request: ${request.method} ${url} headers=${formatLogHeaders(request.getHeaders())}`,
      );
    }

    try {
      const response = await this.next.handle<T>(request);

      if (log.isDebug()) {
        log.debug(
          `HTTP Response: status=${response.metadata.status} url=${url} headers=${formatLogHeaders(response.metadata.headers)}`,
        );
      }

      return response;
    } catch (error: unknown) {
      if (log.isError()) {
        log.error(`HTTP Error: ${this.describeError(error)} url=${url}`);
      }
      throw error;
    }
  }

  /**
   * Handles a streaming HTTP request, logging its start, first response, and any error.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set, or propagates errors from next handler
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in logging handler.');
    }

    const log = Logger.from(request.config.logging);
    const url = sanitizeLogUrl(request.constructFullUrl());

    if (log.isDebug()) {
      log.debug(
        `HTTP Request: ${request.method} ${url} headers=${formatLogHeaders(request.getHeaders())}`,
      );
    }

    try {
      let loggedFirstResponse = false;
      for await (const response of this.next.stream<T>(request)) {
        if (!loggedFirstResponse && log.isDebug()) {
          log.debug(
            `HTTP Response: status=${response.metadata.status} url=${url} headers=${formatLogHeaders(response.metadata.headers)}`,
          );
        }
        loggedFirstResponse = true;
        yield response;
      }
    } catch (error: unknown) {
      if (log.isError()) {
        log.error(`HTTP Error: ${this.describeError(error)} url=${url}`);
      }
      throw error;
    }
  }

  private describeError(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);
    const statusCode = (error as { statusCode?: number } | null)?.statusCode;
    return statusCode !== undefined ? `status=${statusCode} ${message}` : message;
  }
}
