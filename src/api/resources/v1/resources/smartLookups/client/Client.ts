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
import { SmartLookupInput, smartLookupInputRequest } from '../types/SmartLookupInput';
import {
  GetSmartLookupResponse,
  getSmartLookupResponseResponse,
} from '../../../types/GetSmartLookupResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import { PostcodeResponse, postcodeResponseResponse } from '../../../types/PostcodeResponse';
import { SearchPostcodeRequest } from './requests';

export declare namespace SmartLookupsClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for SmartLookups operations.
 * Provides methods to interact with SmartLookups-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class SmartLookupsClient extends BaseService {
  protected performConfig?: Partial<BaseClientOptions>;

  protected searchPostcodeConfig?: Partial<BaseClientOptions>;

  /**
   * Sets method-level configuration for perform.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setPerformConfig(config: Partial<BaseClientOptions>): this {
    this.performConfig = config;
    return this;
  }

  /**
   * Sets method-level configuration for searchPostcode.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setSearchPostcodeConfig(config: Partial<BaseClientOptions>): this {
    this.searchPostcodeConfig = config;
    return this;
  }

  /**
 * Run quick [background checks](https://help.vouchsafe.id/en/articles/11075009-how-background-checks-work) on a user's details.
Provide the user's details and the check(s) to run and receive the report.

First line of address should be taken from the results returned by the [`GET /postcode` endpoint](https://docs.vouchsafe.id/api/v1/search-postcode).

The supported checks are:
  - `CreditBureau` checking credit reference agency data, plus public data like the electoral roll
  - `OnlineFootprint` checking against public traces of the user's online activity
  - `AML` checking international sanctions database, watchlists and other lists of high-risk people

### Caching and billing

To make it easier to test and demo, if you run the same smart lookup query within four hours, your results will be cached and you will not be charged again.

The `billable` field in the response body indicates whether tokens were charged for this call.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://help.vouchsafe.id/en/articles/11979598-how-does-sandbox-mode-work).
 * @param {VouchsafeApi.v1.SmartLookupInput} request
 * @param {SmartLookupsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.GetSmartLookupResponse>} - Performed successfully, report available
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.smartLookups.perform({
 *         first_name: "first_name",
 *         last_name: "last_name",
 *         checks: ["CreditBureau"]
 *     })
 */
  perform(
    request: VouchsafeApi.v1.SmartLookupInput,
    requestOptions?: SmartLookupsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.GetSmartLookupResponse> {
    return HttpResponsePromise.fromPromise(this.__perform(request, requestOptions));
  }
  private async __perform(
    request: VouchsafeApi.v1.SmartLookupInput,
    requestOptions?: SmartLookupsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.GetSmartLookupResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.performConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/smart-lookups')
      .setRequestSchema(smartLookupInputRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getSmartLookupResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.GetSmartLookupResponse>(_request);
  }

  /**
 * Look up all addresses for a given UK postcode.
Useful for guaranteeing that a user's address is recognised before onboarding.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.SearchPostcodeRequest} request
 * @param {SmartLookupsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.PostcodeResponse>} - A list of matching addresses
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.smartLookups.searchPostcode({
 *         postcode: "postcode"
 *     })
 */
  searchPostcode(
    request: VouchsafeApi.v1.SearchPostcodeRequest,
    requestOptions?: SmartLookupsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.PostcodeResponse> {
    return HttpResponsePromise.fromPromise(this.__searchPostcode(request, requestOptions));
  }
  private async __searchPostcode(
    request: VouchsafeApi.v1.SearchPostcodeRequest,
    requestOptions?: SmartLookupsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.PostcodeResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.searchPostcodeConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('GET')
      .setPath('/smart-lookups/postcode')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: postcodeResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addQueryParam({
        key: 'postcode',
        value: request.postcode,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.PostcodeResponse>(_request);
  }
}
