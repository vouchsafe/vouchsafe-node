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
import { AdverseMediaInput, adverseMediaInputRequest } from '../types/AdverseMediaInput';
import {
  AdverseMediaResponse,
  adverseMediaResponseResponse,
} from '../../../types/AdverseMediaResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';

export declare namespace AdverseMediaClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for AdverseMedia operations.
 * Provides methods to interact with AdverseMedia-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class AdverseMediaClient extends BaseService {
  protected checkConfig?: Partial<BaseClientOptions>;

  /**
   * Sets method-level configuration for check.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setCheckConfig(config: Partial<BaseClientOptions>): this {
    this.checkConfig = config;
    return this;
  }

  /**
 * **Experimental (beta):** This is a new endpoint. The interface or behaviour may change without notice.
Screen an individual against recent news coverage for adverse or negative reporting.

Each article returned by the search is scored from 0–100 by our AI screening model. Articles at or above the threshold are returned as `strong_matches` and cause the overall `status` to be `FAIL`.

All articles found are also returned in `all_results` for audit purposes, including those that scored below the threshold.

Providing a `location` is strongly recommended: it significantly improves search precision and reduces false positives for common names.
 * @param {VouchsafeApi.v1.AdverseMediaInput} request
 * @param {AdverseMediaClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.AdverseMediaResponse>} - Check performed successfully
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.adverseMedia.check({
 *         first_name: "first_name",
 *         last_name: "last_name"
 *     })
 */
  check(
    request: VouchsafeApi.v1.AdverseMediaInput,
    requestOptions?: AdverseMediaClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.AdverseMediaResponse> {
    return HttpResponsePromise.fromPromise(this.__check(request, requestOptions));
  }
  private async __check(
    request: VouchsafeApi.v1.AdverseMediaInput,
    requestOptions?: AdverseMediaClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.AdverseMediaResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.checkConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/adverse-media')
      .setRequestSchema(adverseMediaInputRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: adverseMediaResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.AdverseMediaResponse>(_request);
  }
}
