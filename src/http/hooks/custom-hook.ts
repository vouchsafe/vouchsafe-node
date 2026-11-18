import { HttpMetadata } from '../types';
import { Hook } from './hook';
import { HttpRequest, HttpResponse } from './hook';
import { VouchsafeApiError } from '../errors/throwable-error';
import { decodeErrorBody } from '../utils/content-type';

/**
 * Default implementation of the Hook interface that provides pass-through behavior.
 * This hook can be extended to add custom logic for request/response interception.
 */
export class CustomHook implements Hook {
  /**
   * Called before an HTTP request is sent.
   * Default implementation returns the request unchanged.
   * @param request - The HTTP request to be sent
   * @param params - Additional custom parameters
   * @returns A promise that resolves to the unmodified request
   */
  public async beforeRequest(
    request: HttpRequest,
    params: Map<string, string>,
  ): Promise<HttpRequest> {
    return request;
  }

  /**
   * Called after a successful HTTP response is received.
   * Default implementation returns the response unchanged.
   * @param request - The original HTTP request
   * @param response - The HTTP response received
   * @param params - Additional custom parameters
   * @returns A promise that resolves to the unmodified response
   */
  public async afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpResponse<any>> {
    return response;
  }

  /**
   * Called when an HTTP request results in an error.
   * Default implementation wraps the error response in an HttpError object.
   * @param request - The original HTTP request
   * @param response - The error response received
   * @param params - Additional custom parameters
   * @returns A promise that resolves to an HttpError object
   */
  public async onError(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<VouchsafeApiError> {
    return new VouchsafeApiError({
      statusCode: response.metadata.status,
      body: this.parseErrorBody(response),
      rawResponse: response.rawResponse!,
    });
  }

  private parseErrorBody(response: HttpResponse<any>): unknown {
    const raw: unknown = response.raw;
    if (!(raw instanceof ArrayBuffer) && !ArrayBuffer.isView(raw)) {
      return raw;
    }
    return decodeErrorBody(raw, response.metadata.headers['content-type']);
  }
}
