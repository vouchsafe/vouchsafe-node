import { Request } from '../transport/request';
import { HttpResponse, RequestHandler } from '../types';
import { VouchsafeApiError } from '../errors/throwable-error';
import { decodeErrorBody } from '../utils/content-type';
import { BadRequestError } from '../../api/errors/BadRequestError';
import { UnauthorizedError } from '../../api/errors/UnauthorizedError';
import { ForbiddenError } from '../../api/errors/ForbiddenError';
import { NotFoundError } from '../../api/errors/NotFoundError';
import { MethodNotAllowedError } from '../../api/errors/MethodNotAllowedError';
import { ConflictError } from '../../api/errors/ConflictError';
import { UnprocessableEntityError } from '../../api/errors/UnprocessableEntityError';
import { NotImplementedError } from '../../api/errors/NotImplementedError';
import { ServiceUnavailableError } from '../../api/errors/ServiceUnavailableError';
import { ApiErrorResponse } from '../../api/resources/v1/types/ApiErrorResponse';
import { ApiErrorResponseV2 } from '../../api/resources/v2/types/ApiErrorResponseV2';
import { Hook } from '../hooks/hook';
import { TransportHookAdapter } from '../transport/transport-hook-adapter';

/**
 * Request handler that invokes custom hooks before requests and after responses.
 * Enables request/response interception and custom error handling.
 */
export class HookHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  constructor(private readonly hook: Hook) {}

  /**
   * Handles a standard HTTP request with hook invocation.
   * Calls beforeRequest hook, processes the request, and calls the afterResponse hook.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set, or if error handling fails
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in hook handler.');
    }

    const hook = new TransportHookAdapter<T>();

    const hookParams = this.getHookParams<T>(request);

    const nextRequest = await hook.beforeRequest(request, hookParams);

    const response = await this.next.handle<T>(nextRequest);

    if (response.metadata.status < 400) {
      return await hook.afterResponse(nextRequest, response, hookParams);
    }

    return await this.throwErrorResponse<T>(request, response);
  }

  private async throwErrorResponse<T>(
    request: Request,
    response: HttpResponse<T>,
    resolveUndeclaredError?: () => Promise<unknown>,
  ): Promise<never> {
    // Handle error responses
    const arrayBuffer = response.raw;
    const statusCode = response.metadata.status;
    const body = decodeErrorBody(arrayBuffer, response.metadata.headers['content-type']);

    switch (statusCode) {
      case 400:
        throw new BadRequestError(body, response.rawResponse!);
      case 401:
        throw new UnauthorizedError(body, response.rawResponse!);
      case 403:
        throw new ForbiddenError(body, response.rawResponse!);
      case 404:
        throw new NotFoundError(body as ApiErrorResponse, response.rawResponse!);
      case 405:
        throw new MethodNotAllowedError(body as ApiErrorResponseV2, response.rawResponse!);
      case 409:
        throw new ConflictError(body as ApiErrorResponse, response.rawResponse!);
      case 422:
        throw new UnprocessableEntityError(body, response.rawResponse!);
      case 501:
        throw new NotImplementedError(body as ApiErrorResponse, response.rawResponse!);
      case 503:
        throw new ServiceUnavailableError(body as ApiErrorResponse, response.rawResponse!);
    }

    if (resolveUndeclaredError) {
      throw await resolveUndeclaredError();
    }

    throw new VouchsafeApiError({ statusCode, body, rawResponse: response.rawResponse! });
  }

  /**
   * Handles a streaming HTTP request with hook invocation.
   * Calls beforeRequest hook and afterResponse/onError hooks for each chunk.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set, or if error handling fails
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in hook handler.');
    }

    const hook = new TransportHookAdapter<T>();

    const hookParams = this.getHookParams<T>(request);

    const nextRequest = await hook.beforeRequest(request, hookParams);

    const stream = this.next.stream<T>(nextRequest);

    for await (const response of stream) {
      if (response.metadata.status < 400) {
        yield await hook.afterResponse(nextRequest, response, hookParams);
      } else {
        return await this.throwErrorResponse<T>(request, response, () =>
          hook.onError(nextRequest, response, hookParams),
        );
      }
    }
  }

  /**
   * Extracts hook parameters from the request configuration.
   * @template T - The response data type
   * @param request - The HTTP request
   * @returns A map of hook parameter names to values
   */
  private getHookParams<T>(_request: Request): Map<string, string> {
    const hookParams: Map<string, string> = new Map();
    return hookParams;
  }
}
