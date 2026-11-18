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
import { GetTeamResponse, getTeamResponseResponse } from '../../../types/GetTeamResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import { createTeamInputRequest } from '../types/CreateTeamInput';
import { CreateTeamResponse, createTeamResponseResponse } from '../../../types/CreateTeamResponse';
import { CreateTeamInput } from './requests';

export declare namespace TeamClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Team operations.
 * Provides methods to interact with Team-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class TeamClient extends BaseService {
  protected getConfig?: Partial<BaseClientOptions>;

  protected createConfig?: Partial<BaseClientOptions>;

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
   * Sets method-level configuration for create.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setCreateConfig(config: Partial<BaseClientOptions>): this {
    this.createConfig = config;
    return this;
  }

  /**
 * Get the currently authenticated team.

Helpful for testing, especially when managing multiple client IDs and secrets.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {TeamClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.GetTeamResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.team.get()
 */
  get(
    requestOptions?: TeamClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.GetTeamResponse> {
    return HttpResponsePromise.fromPromise(this.__get(requestOptions));
  }
  private async __get(
    requestOptions?: TeamClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.GetTeamResponse>> {
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
      .setPath('/team')
      .setRequestSchema(core.cast.identity<unknown>())
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getTeamResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.GetTeamResponse>(_request);
  }

  /**
 * Create a new team (Partners only).
Creates a new team with the specified configuration and admin users.

Vouchsafe will respond with:

- a unique team ID for tracking
- the team name and public-facing name
- client credentials to authenticate team API requests
- creation timestamp (ISO 8601 format)

The provided admin emails will be granted administrative access to manage the team's settings and workflows.

**Note:** This endpoint requires a valid partner token in the `X-Partner-Token` header.
 * @param {VouchsafeApi.v1.CreateTeamInput} request
 * @param {TeamClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.CreateTeamResponse>} - OK
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.team.create({
 *         "X-Partner-Token": "X-Partner-Token",
 *         name: "name",
 *         team_admin_emails: ["team_admin_emails"]
 *     })
 */
  create(
    request: VouchsafeApi.v1.CreateTeamInput,
    requestOptions?: TeamClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.CreateTeamResponse> {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  private async __create(
    request: VouchsafeApi.v1.CreateTeamInput,
    requestOptions?: TeamClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.CreateTeamResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.createConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/team')
      .setRequestSchema(createTeamInputRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: createTeamResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addHeaderParam({
        key: 'X-Partner-Token',
        value: request['X-Partner-Token'],
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody({
        name: request.name,
        public_name: request.public_name,
        logo_url: request.logo_url,
        team_admin_emails: request.team_admin_emails,
        flow_template: request.flow_template,
      })
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.CreateTeamResponse>(_request);
  }
}
