import { Request } from '../transport/request';
import { HttpResponse, RequestHandler } from '../types';
import { OAuthTokenManager } from '../oauth/token-manager';
import { SerializationStyle } from '../serialization/base-serializer';

/**
 * Request handler that manages OAuth 2.0 authentication.
 * Automatically adds access tokens to requests and handles token retrieval.
 */
export class OAuthHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request with OAuth authentication.
   * Manages access tokens and adds Authorization headers.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error(`No next handler set in OAuthHandler`);
    }

    if (!!request.config.accessToken) {
      this.addAccessTokenHeader(request, request.config.accessToken);
      return this.next.handle<T>(request);
    }

    if (!request.config.clientId || !request.config.clientSecret) {
      return this.next.handle<T>(request);
    }

    await this.manageToken(request);

    return this.next.handle<T>(request);
  }

  /**
   * Handles a streaming HTTP request with OAuth authentication.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error(`No next handler set in OAuthHandler`);
    }

    await this.manageToken(request);

    yield* this.next.stream<T>(request);
  }

  /**
   * Retrieves an access token for the required scopes and adds it to the request.
   * @param request - The HTTP request to add the token to
   */
  private async manageToken(request: Request): Promise<void> {
    if (!request.scopes) {
      return;
    }

    const token = await request.tokenManager.getToken(request.scopes, request.config);

    if (token.accessToken) {
      this.addAccessTokenHeader(request, token.accessToken);
    }
  }

  /**
   * Adds the OAuth access token to the request's Authorization header.
   * @param request - The HTTP request to modify
   * @param token - The access token to add
   */
  private addAccessTokenHeader(request: Request, token: string): void {
    request.addHeaderParam('Authorization', {
      key: 'Authorization',
      value: `Bearer ${token}`,
      explode: false,
      encode: false,
      style: SerializationStyle.SIMPLE,
      isLimit: false,
      isOffset: false,
      isCursor: false,
    });
  }
}
