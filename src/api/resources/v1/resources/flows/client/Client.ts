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
import { ListFlowsResponse } from '../../../../../types/ListFlowsResponse';
import { Flow, flowResponse } from '../../../types/Flow';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import { GetFlowResponse, getFlowResponseResponse } from '../../../types/GetFlowResponse';
import { GetFlowsRequest } from './requests';

export declare namespace FlowsClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Flows operations.
 * Provides methods to interact with Flows-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class FlowsClient extends BaseService {
  protected listConfig?: Partial<BaseClientOptions>;

  protected getConfig?: Partial<BaseClientOptions>;

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
   * Sets method-level configuration for get.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setGetConfig(config: Partial<BaseClientOptions>): this {
    this.getConfig = config;
    return this;
  }

  /**
 * Get a list of all the currently published verification flows.

Use an ID from one of these flows to request verifications with the  [`POST /verifications` endpoint](https://app.vouchsafe.id/docs/operations/RequestVerification).

Referee-specific verification flows cannot be started independently, so are not returned by this endpoint.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {FlowsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.ListFlowsResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.flows.list()
 */
  list(
    requestOptions?: FlowsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.ListFlowsResponse> {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  private async __list(
    requestOptions?: FlowsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.ListFlowsResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.listConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('GET')
      .setPath('/flows')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: core.cast.list(flowResponse),
        contentType: ContentType.Json,
        status: 200,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.ListFlowsResponse>(_request);
  }

  /**
 * Get a specific verification flow.

Use an ID from one of these flows to request verifications with the  [`POST /verifications` endpoint](https://app.vouchsafe.id/docs/operations/RequestVerification).

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.GetFlowsRequest} request
 * @param {FlowsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.GetFlowResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.flows.get({
 *         id: "id"
 *     })
 */
  get(
    request: VouchsafeApi.v1.GetFlowsRequest,
    requestOptions?: FlowsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.GetFlowResponse> {
    return HttpResponsePromise.fromPromise(this.__get(request, requestOptions));
  }
  private async __get(
    request: VouchsafeApi.v1.GetFlowsRequest,
    requestOptions?: FlowsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.GetFlowResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.getConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('GET')
      .setPath('/flows/{id}')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getFlowResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'id',
        value: request.id,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.GetFlowResponse>(_request);
  }
}
