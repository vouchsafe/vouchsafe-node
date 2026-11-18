import * as core from '../../../../../../core';
import type * as VouchsafeApi from '../../../../..';
import { BaseService } from '../../../../../../services/base-service';
import {
  BaseClientOptions,
  BaseRequestOptions,
  ContentType,
  HttpResponse,
} from '../../../../../../http/types';
import { RequestBuilder } from '../../../../../../http/transport/request-builder';
import { SerializationStyle } from '../../../../../../http/serialization/base-serializer';
import { VouchsafeApiError } from '../../../../../../http/errors/throwable-error';
import { HttpResponsePromise, WithRawResponse } from '../../../../../../http/response-promise';
import { Supplier, resolveHeaders } from '../../../../../../http/utils/supplier';
import { VouchsafeApiEnvironment } from '../../../../../../http/environment';
import { AuthenticateInput, authenticateInputRequest } from '../types/AuthenticateInput';
import {
  AuthenticateResponse,
  authenticateResponseResponse,
} from '../../../types/AuthenticateResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';

export declare namespace AuthenticationClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Authentication operations.
 * Provides methods to interact with Authentication-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class AuthenticationClient extends BaseService {
  protected authenticateConfig?: Partial<BaseClientOptions>;

  /**
   * Sets method-level configuration for authenticate.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setAuthenticateConfig(config: Partial<BaseClientOptions>): this {
    this.authenticateConfig = config;
    return this;
  }

  /**
 * Get the access token, needed for all other API requests.
You will need your client ID and secret from the **API Integration** tab of the Vouchsafe dashboard.

Each access token is valid for 24 hours, after which you will need to re-authenticate.

Once you have an access token, pass it in future requests as a [Bearer token](https://workos.com/blog/understanding-bearer-tokens) in an `Authorization` header.

Use an [SDK or library](https://help.vouchsafe.id/en/articles/12026847-vouchsafe-sdks-and-libraries) to simplify handling tokens

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.AuthenticateInput} request
 * @param {AuthenticationClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.AuthenticateResponse>} - Token created successfully
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.authentication.authenticate({
 *         client_id: "client_id",
 *         client_secret: "client_secret"
 *     })
 */
  authenticate(
    request: VouchsafeApi.v1.AuthenticateInput,
    requestOptions?: AuthenticationClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.AuthenticateResponse> {
    return HttpResponsePromise.fromPromise(this.__authenticate(request, requestOptions));
  }
  private async __authenticate(
    request: VouchsafeApi.v1.AuthenticateInput,
    requestOptions?: AuthenticationClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.AuthenticateResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.authenticateConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/authenticate')
      .setRequestSchema(authenticateInputRequest)
      .addBasicAuth(resolvedConfig?.clientId, resolvedConfig?.clientSecret)
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: authenticateResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.AuthenticateResponse>(_request);
  }
}
