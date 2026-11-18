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
  GetArtefactsResponse,
  getArtefactsResponseResponse,
} from '../../../types/GetArtefactsResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import { GetArtefactsRequest } from './requests';

export declare namespace ArtefactsClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Artefacts operations.
 * Provides methods to interact with Artefacts-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class ArtefactsClient extends BaseService {
  protected getConfig?: Partial<BaseClientOptions>;

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
 * Get an artefact download link.
For security reasons, other endpoints (e.g. `GET /verifications/{id}`) may return only an `artefact_key`.
Use this endpoint to exchange that key for a **time-limited pre-signed URL** that can be used
to download the file.

You may also pass a **verification ID** in place of an artefact key. In that case
Vouchsafe returns a pre-signed URL to that verification's downloadable **PDF report**. 
Reports are only available for fully-decided verifications (`Verified`, `ManuallyReviewed`, or `Refused`); any other state returns
`409 Report not available`.

Vouchsafe will respond with:
- the requested `artefact_key`
- a `download_url` (pre-signed and time-limited)
- an `expires_at` timestamp (ISO 8601, UTC)

**Note:** The `download_url` will stop working after `expires_at`.
If it expires, request a new URL using this endpoint.
 * @param {VouchsafeApi.v1.GetArtefactsRequest} request
 * @param {ArtefactsClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.GetArtefactsResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.NotFoundError}
 * @throws {@link VouchsafeApi.ConflictError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.artefacts.get({
 *         artefact_key: "artefact_key"
 *     })
 */
  get(
    request: VouchsafeApi.v1.GetArtefactsRequest,
    requestOptions?: ArtefactsClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.GetArtefactsResponse> {
    return HttpResponsePromise.fromPromise(this.__get(request, requestOptions));
  }
  private async __get(
    request: VouchsafeApi.v1.GetArtefactsRequest,
    requestOptions?: ArtefactsClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.GetArtefactsResponse>> {
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
      .setPath('/artefacts/{artefact_key}')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getArtefactsResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addPathParam({
        key: 'artefact_key',
        value: request.artefact_key,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.GetArtefactsResponse>(_request);
  }
}
