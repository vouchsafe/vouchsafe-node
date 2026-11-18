import * as core from '../../../../../../core';
import type * as VouchsafeApi from '../../../../..';
import { BaseService } from '../../../../../../services/base-service';
import { BaseClientOptions, BaseRequestOptions, ContentType, HttpResponse } from '../../../../../../http/types';
import { RequestBuilder } from '../../../../../../http/transport/request-builder';
import { SerializationStyle } from '../../../../../../http/serialization/base-serializer';
import { VouchsafeApiError } from '../../../../../../http/errors/throwable-error';
import { HttpResponsePromise, WithRawResponse } from '../../../../../../http/response-promise';
import { Supplier, resolveHeaders } from '../../../../../../http/utils/supplier';
import { VouchsafeApiEnvironment } from '../../../../../../http/environment';
import { ListCoverageResponse } from '../../../../../types/ListCoverageResponse';
import { CoverageItem, coverageItemResponse } from '../../../types/CoverageItem';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import { ListCoverageRequest } from './requests';

export declare namespace CoverageClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Coverage operations.
 * Provides methods to interact with Coverage-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class CoverageClient extends BaseService {
      protected listConfig?: Partial<BaseClientOptions>;

      /**
       * Sets method-level configuration for list.
       * @param config - Partial configuration to override service-level defaults
       * @returns This service instance for method chaining
       */
      protected setListConfig(config: Partial<BaseClientOptions>): this {
        this.listConfig = config;
        return this;
      }

      /**
 * Get the digital ID schemes, photo IDs, supporting documents and trusted data sources Vouchsafe covers, optionally filtered by country and/or type.
Each item is listed once, with every jurisdiction it applies to in `country_codes`. Items that apply everywhere (e.g. passports, or supporting documents which aren't restricted by country) have an empty `country_codes` array.

DIGITAL_ID includes our full digital ID provider catalog, not just the providers Vouchsafe has a working verification flow for — `id` is `null` for anything that can't be submitted anywhere today.
 * @param {VouchsafeApi.v1.ListCoverageRequest} request
 * @param {CoverageClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.ListCoverageResponse>} - A list of supported coverage items
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.coverage.list()
 */
  list(request: VouchsafeApi.v1.ListCoverageRequest = {}, requestOptions?: CoverageClient.RequestOptions): HttpResponsePromise<VouchsafeApi.ListCoverageResponse> {
    return HttpResponsePromise.fromPromise(this.__list(request, requestOptions));
  }
  private async __list(request: VouchsafeApi.v1.ListCoverageRequest = {}, requestOptions?: CoverageClient.RequestOptions): Promise<WithRawResponse<VouchsafeApi.ListCoverageResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.listConfig, requestOptions);
  const resolvedBaseUrl = await Supplier.get(resolvedConfig.baseUrl ?? ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1);
  const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
    .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
    .setBaseUrl(resolvedBaseUrl)
    .setMethod('GET')
    .setPath('/coverage')
    .setRequestSchema(core.cast.identity<unknown>())
    .setScopes([  ])
  .setTokenManager(this.tokenManager)
    .setRequestContentType(ContentType.Json)
  .addResponse({
      schema: core.cast.list(coverageItemResponse),
      contentType: ContentType.Json,
      status: 200,
    })
      .addQueryParam({
key: 'country_code',
value: request.country_code,
})
    .addQueryParam({
key: 'type',
value: request.type,
})
      .build()
    return this.client.callWithRawResponse<VouchsafeApi.ListCoverageResponse>(_request);
  }

}
