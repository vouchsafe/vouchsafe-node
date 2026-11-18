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
import { CheckRiskRequest, checkRiskRequestRequest } from '../types/CheckRiskRequest';
import { GetRiskResponse, getRiskResponseResponse } from '../../../types/GetRiskResponse';
import { ApiErrorResponseV2 } from '../../../types/ApiErrorResponseV2';

export declare namespace RiskClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Risk operations.
 * Provides methods to interact with Risk-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class RiskClient extends BaseService {
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
 * This is Vouchsafe's headline Risk API.
It gives you an instant picture of the identity fraud risk a customer represents, powered by our real-time fraud intelligence network and premium partner data.

Pass the information you have about a customer, and Vouchsafe will scan our network for signs that an identity might be stolen, synthetic or otherwise risky, using verification data and shared reports made by other businesses using the platform.

You can also run premium `enrichments`:

- `OFFICIAL_RECORDS` will look for authoritative evidence of a claimed identity and address in official and semi-official databases from around the world, which you can use as an FCA-compliant eKYC onboarding process.
- `ONLINE_FOOTPRINT` will analyse the identity's digital and online history, to determine if it is likely to be legitimate or recently made-up.
- `AML` will search over [280 global databases](https://vouchsafe.id/coverage/) of high-risk entities connected to financial or economic crime, including sanctions, watchlists and politically exposed people. It also enrols the person in ongoing monitoring, reported as `alerts_enabled_at`.
- `ADVERSE_MEDIA` searches news coverage for reported wrongdoing linked to fraud or financial crime.

The more checks you turn on, the more complete the data you send needs to be.

This endpoint always returns a `risk_score` between 0 and 100, and a `recommendation` based on that risk, along with extensive metadata so you can explore the discovered trust and risk signals.

This endpoint can form the basis of a transaction monitoring or data-driven KYC/AML system.

### Recommendations

Our Risk API returns one of three recommendations: `CLEAR`, `REVIEW`, and `REJECT`.

### Face scan

Optionally send a `face_scan`: a live selfie or liveness image (JPEG or PNG, up to 10 MB). We'll check it against our fraud intelligence network to see whether the same face has been used under different identities. Without it, face-based checks are skipped.

### Address

When the official records enrichment is turned on, a structured `address` is required. This should be taken from the results returned by the [`GET /postcode` endpoint](https://docs.vouchsafe.id/api/v1/search-postcode). See the `address` field below for how to split a flat, building name and street number.

### Sandbox

In sandbox mode, `email` picks the recommendation you get back.

| `email` | Recommendation |
|---|---|
| contains `+reject` | `REJECT` |
| contains `+review` | `REVIEW` |
| anything else | `CLEAR` |

The response echoes your input and includes only the enrichments you requested.

Requested enrichments are shaped to match the outcome:

- CLEAR: all pass
- REVIEW: only the last requested enrichment fails
- REJECT: all fail

To return a record you can open in the sandbox dashboard, use `dwebb@email.com` (`CLEAR`), `jdoe@email.com` (`REVIEW`), or `eroberts@email.com` (`REJECT`).
 * @param {VouchsafeApi.v2.CheckRiskRequest} request
 * @param {RiskClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v2.GetRiskResponse>} - Risk assessment completed
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.MethodNotAllowedError}
 * @throws {@link VouchsafeApi.UnprocessableEntityError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v2.risk.check({
 *         first_name: "first_name",
 *         last_name: "last_name",
 *         email: "email",
 *         date_of_birth: "date_of_birth"
 *     })
 */
  check(
    request: VouchsafeApi.v2.CheckRiskRequest,
    requestOptions?: RiskClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v2.GetRiskResponse> {
    return HttpResponsePromise.fromPromise(this.__check(request, requestOptions));
  }
  private async __check(
    request: VouchsafeApi.v2.CheckRiskRequest,
    requestOptions?: RiskClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v2.GetRiskResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.checkConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v2,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/risk')
      .setRequestSchema(checkRiskRequestRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.MultipartFormData)
      .addResponse({
        schema: getRiskResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v2.GetRiskResponse>(_request);
  }
}
