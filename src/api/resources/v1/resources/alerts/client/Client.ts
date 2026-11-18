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
import {
  ListAlertAccountsResponse,
  listAlertAccountsResponseResponse,
} from '../../../types/ListAlertAccountsResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import {
  AcknowledgeAlertsRequest,
  GetAccountAlertsRequest,
  ListAccountsRequest,
  ToggleAlertsInput,
} from './requests';
import {
  AlertAccountDetailResponse,
  alertAccountDetailResponseResponse,
} from '../../../types/AlertAccountDetailResponse';
import { toggleAlertsInputRequest } from '../types/ToggleAlertsInput';
import {
  ToggleAlertsResponse,
  toggleAlertsResponseResponse,
} from '../../../types/ToggleAlertsResponse';
import {
  AcknowledgeAlertResponse,
  acknowledgeAlertResponseResponse,
} from '../../../types/AcknowledgeAlertResponse';

export declare namespace AlertsClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Alerts operations.
 * Provides methods to interact with Alerts-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class AlertsClient extends BaseService {
  protected listAccountsConfig?: Partial<BaseClientOptions>;

  protected getAccountConfig?: Partial<BaseClientOptions>;

  protected toggleConfig?: Partial<BaseClientOptions>;

  protected acknowledgeConfig?: Partial<BaseClientOptions>;

  /**
   * Sets method-level configuration for listAccounts.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setListAccountsConfig(config: Partial<BaseClientOptions>): this {
    this.listAccountsConfig = config;
    return this;
  }

  /**
   * Sets method-level configuration for getAccount.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setGetAccountConfig(config: Partial<BaseClientOptions>): this {
    this.getAccountConfig = config;
    return this;
  }

  /**
   * Sets method-level configuration for toggle.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setToggleConfig(config: Partial<BaseClientOptions>): this {
    this.toggleConfig = config;
    return this;
  }

  /**
   * Sets method-level configuration for acknowledge.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setAcknowledgeConfig(config: Partial<BaseClientOptions>): this {
    this.acknowledgeConfig = config;
    return this;
  }

  /**
 * List monitored accounts.
Returns accounts that have ongoing AML/sanctions monitoring enabled,
with summary info including current alert status.

Use cursor-based pagination to iterate through results.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.ListAccountsRequest} request
 * @param {AlertsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.ListAlertAccountsResponse>} - OK
 *
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.alerts.listAccounts()
 */
  listAccounts(
    request: VouchsafeApi.v1.ListAccountsRequest = {},
    requestOptions?: AlertsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.ListAlertAccountsResponse> {
    return HttpResponsePromise.fromPromise(this.__listAccounts(request, requestOptions));
  }
  private async __listAccounts(
    request: VouchsafeApi.v1.ListAccountsRequest = {},
    requestOptions?: AlertsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.ListAlertAccountsResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.listAccountsConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('GET')
      .setPath('/alerts/accounts')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: listAlertAccountsResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addQueryParam({
        key: 'status',
        value: request.status,
      })
      .addQueryParam({
        key: 'cursor',
        value: request.cursor,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.ListAlertAccountsResponse>(_request);
  }

  /**
 * Get full account detail.
Returns the account's personal details and all alerts.

Each alert has a `source` field that determines its shape:
- `"AML"` - triggered by a sanctions/PEP screening hit. Populates `matches[]` with the matched entities.
- `"FraudBlocklist"` - triggered by a match in our internal network. Populates `matched_on` with the datapoint that matched it (`"email"` and/or `"face"`).

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.GetAccountAlertsRequest} request
 * @param {AlertsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.AlertAccountDetailResponse>} - OK
 *
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.alerts.getAccount({
 *         id: "id"
 *     })
 */
  getAccount(
    request: VouchsafeApi.v1.GetAccountAlertsRequest,
    requestOptions?: AlertsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.AlertAccountDetailResponse> {
    return HttpResponsePromise.fromPromise(this.__getAccount(request, requestOptions));
  }
  private async __getAccount(
    request: VouchsafeApi.v1.GetAccountAlertsRequest,
    requestOptions?: AlertsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.AlertAccountDetailResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.getAccountConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('GET')
      .setPath('/alerts/accounts/{id}')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: alertAccountDetailResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'id',
        value: request.id,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.AlertAccountDetailResponse>(_request);
  }

  /**
 * Toggle ongoing monitoring for an account.
Enable or disable AML/sanctions screening for an existing account.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.ToggleAlertsInput} request
 * @param {AlertsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.ToggleAlertsResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.alerts.toggle({
 *         id: "id",
 *         alerts_enabled: true
 *     })
 */
  toggle(
    request: VouchsafeApi.v1.ToggleAlertsInput,
    requestOptions?: AlertsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.ToggleAlertsResponse> {
    return HttpResponsePromise.fromPromise(this.__toggle(request, requestOptions));
  }
  private async __toggle(
    request: VouchsafeApi.v1.ToggleAlertsInput,
    requestOptions?: AlertsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.ToggleAlertsResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.toggleConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('PATCH')
      .setPath('/alerts/accounts/{id}')
      .setRequestSchema(toggleAlertsInputRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: toggleAlertsResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'id',
        value: request.id,
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody({ alerts_enabled: request.alerts_enabled })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.ToggleAlertsResponse>(_request);
  }

  /**
 * Marks an alert as acknowledged.
The acknowledgement will be attributed to the name of the API key used to make the request.

This action is idempotent. Calling it on an already-acknowledged alert
returns the original acknowledgement timestamp.

The alert ID can be found in the webhook notification payload (`alertId`),
or by calling `GET /v1/alerts/accounts/{id}` and reading the `id` field
on an alert in the response.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.AcknowledgeAlertsRequest} request
 * @param {AlertsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.AcknowledgeAlertResponse>} - OK
 *
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.alerts.acknowledge({
 *         alertId: "alertId"
 *     })
 */
  acknowledge(
    request: VouchsafeApi.v1.AcknowledgeAlertsRequest,
    requestOptions?: AlertsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.AcknowledgeAlertResponse> {
    return HttpResponsePromise.fromPromise(this.__acknowledge(request, requestOptions));
  }
  private async __acknowledge(
    request: VouchsafeApi.v1.AcknowledgeAlertsRequest,
    requestOptions?: AlertsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.AcknowledgeAlertResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.acknowledgeConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('PATCH')
      .setPath('/alerts/{alertId}')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: acknowledgeAlertResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'alertId',
        value: request.alertId,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.AcknowledgeAlertResponse>(_request);
  }
}
