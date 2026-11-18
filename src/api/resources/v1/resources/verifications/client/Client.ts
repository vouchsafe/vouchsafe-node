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
import { ListVerificationsResponse } from '../../../../../types/ListVerificationsResponse';
import { Verification, verificationResponse } from '../../../types/Verification';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import {
  CancelVerificationsRequest,
  GetVerificationsRequest,
  ListVerificationsRequest,
} from './requests';
import {
  RequestVerificationInput,
  requestVerificationInputRequest,
} from '../types/RequestVerificationInput';
import {
  RequestVerificationResponse,
  requestVerificationResponseResponse,
} from '../../../types/RequestVerificationResponse';
import {
  GetVerificationResponse,
  getVerificationResponseResponse,
} from '../../../types/GetVerificationResponse';

export declare namespace VerificationsClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Verifications operations.
 * Provides methods to interact with Verifications-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class VerificationsClient extends BaseService {
  protected listConfig?: Partial<BaseClientOptions>;

  protected requestConfig?: Partial<BaseClientOptions>;

  protected getConfig?: Partial<BaseClientOptions>;

  protected cancelConfig?: Partial<BaseClientOptions>;

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
   * Sets method-level configuration for request.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setRequestConfig(config: Partial<BaseClientOptions>): this {
    this.requestConfig = config;
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
   * Sets method-level configuration for cancel.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setCancelConfig(config: Partial<BaseClientOptions>): this {
    this.cancelConfig = config;
    return this;
  }

  /**
 * List all verifications for your team.
This can be a long list, so filtering by status is recommended.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.ListVerificationsRequest} request
 * @param {VerificationsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.ListVerificationsResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verifications.list()
 */
  list(
    request: VouchsafeApi.v1.ListVerificationsRequest = {},
    requestOptions?: VerificationsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.ListVerificationsResponse> {
    return HttpResponsePromise.fromPromise(this.__list(request, requestOptions));
  }
  private async __list(
    request: VouchsafeApi.v1.ListVerificationsRequest = {},
    requestOptions?: VerificationsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.ListVerificationsResponse>> {
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
      .setPath('/verifications')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: core.cast.list(verificationResponse),
        contentType: ContentType.Json,
        status: 200,
      })
      .addQueryParam({
        key: 'status',
        value: request.status,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.ListVerificationsResponse>(_request);
  }

  /**
 * Request a new verification.
Provide the user's email and the ID of one of your verification flows to send them through.

Vouchsafe will respond with:

- a URL to redirect to the user to
- a unique ID for you to track the verification

If you have enabled "On request creation" emails in your flow, this also sends them an email.

You can optionally provide more information/claims about the user, like their name, date of birth and address. Any that are provided will be checked against evidence the user gives.

If you do provide additional information about your user, you should let them know the information you are expecting them to verify. This helps prevent users getting stuck when the evidence they have does not match what you have provided.

#### Existing verifications

If a user already has an in progress verification for the same email address and flow, a new verification is not created. To start a new verification for that user in the same flow, first cancel their existing verification using the [CancelVerification](https://docs.vouchsafe.id/api/v1/cancel-verification) endpoint.

#### Expiry

Verifications expire after the window configured on your flow (default: **7 days** from creation). Once expired, the verification link stops working and the verification will show as **Expired** in your dashboard.
v
You can override the expiry for a specific verification using the `expires_at` field. Provide an **ISO 8601 timestamp** (e.g. `2025-08-08T12:00:00Z`). 

**Recommendation:** If you use this field, make sure the window is long enough for the user to receive and complete the verification - we recommend **at least 1 day**. Otherwise, omit `expires_at` and the default flow expiry window will be used.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.RequestVerificationInput} request
 * @param {VerificationsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.RequestVerificationResponse>} - An in progress verification already exists and is returned
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.UnprocessableEntityError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verifications.request({
 *         email: "email"
 *     })
 */
  request(
    request: VouchsafeApi.v1.RequestVerificationInput,
    requestOptions?: VerificationsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.RequestVerificationResponse> {
    return HttpResponsePromise.fromPromise(this.__request(request, requestOptions));
  }
  private async __request(
    request: VouchsafeApi.v1.RequestVerificationInput,
    requestOptions?: VerificationsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.RequestVerificationResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.requestConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/verifications')
      .setRequestSchema(requestVerificationInputRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: requestVerificationResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.RequestVerificationResponse>(_request);
  }

  /**
 * Get a single verification by ID.
Returns the latest status, claim details and results for a verification you previously requested.

Vouchsafe will respond with:

- the verification status and timestamps
- the identity claim details (e.g. name, email, phone number)
- the list of checks performed (e.g. liveness, photo ID, email verification) including outcomes and validations
- results of any background checks (e.g. radar, online footprint analysis, aml sanctions)

#### Downloading files (artefacts)

Some checks may include an `artefacts` array (for example: face scan or document images).
For security reasons, the verification response only contains an `artefact key` — not the file itself.

To download an artefact, use:

- `GET /artefacts/{artefact_key}`

This returns a **time-limited pre-signed URL** which can be used to download the file.

#### Erased verifications

If the data subject has exercised their right to erasure, the verification's `erased_at`
timestamp will be set, and `erased_by` records the operator who ran the erasure. The
verification's `status` and timestamps are retained so you keep an audit trail, but all
personal data (claim details, extracted document details, artefacts and enrichments) will be
empty. Check `erased_at` to distinguish an erased verification from one that simply never
collected that data.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.GetVerificationsRequest} request
 * @param {VerificationsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.GetVerificationResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verifications.get({
 *         id: "id"
 *     })
 */
  get(
    request: VouchsafeApi.v1.GetVerificationsRequest,
    requestOptions?: VerificationsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.GetVerificationResponse> {
    return HttpResponsePromise.fromPromise(this.__get(request, requestOptions));
  }
  private async __get(
    request: VouchsafeApi.v1.GetVerificationsRequest,
    requestOptions?: VerificationsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.GetVerificationResponse>> {
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
      .setPath('/verifications/{id}')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getVerificationResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'id',
        value: request.id,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.GetVerificationResponse>(_request);
  }

  /**
 * Cancel an in progress verification.
Only verifications with a status of `InProgress` can be cancelled. Any other status returns a `409`.

Once cancelled, requesting a verification for the same email and flow creates a new verification.

In sandbox mode, you can call this endpoint to see the response for each sandbox verification account. The request does not persist any changes, so the sample verification retains its original status.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.CancelVerificationsRequest} request
 * @param {VerificationsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.GetVerificationResponse>} - Verification cancelled
 *
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link VouchsafeApi.ConflictError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verifications.cancel({
 *         id: "id"
 *     })
 */
  cancel(
    request: VouchsafeApi.v1.CancelVerificationsRequest,
    requestOptions?: VerificationsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.GetVerificationResponse> {
    return HttpResponsePromise.fromPromise(this.__cancel(request, requestOptions));
  }
  private async __cancel(
    request: VouchsafeApi.v1.CancelVerificationsRequest,
    requestOptions?: VerificationsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.GetVerificationResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.cancelConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/verifications/{id}/cancel')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getVerificationResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'id',
        value: request.id,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.GetVerificationResponse>(_request);
  }
}
