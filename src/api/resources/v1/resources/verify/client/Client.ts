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
  SupportingDocumentVerifyRequest,
  supportingDocumentVerifyRequestRequest,
} from '../types/SupportingDocumentVerifyRequest';
import {
  SupportingDocumentVerificationResponse,
  supportingDocumentVerificationResponseResponse,
} from '../../../types/SupportingDocumentVerificationResponse';
import { ApiErrorResponse } from '../../../types/ApiErrorResponse';
import { PhotoIdVerifyRequest, photoIdVerifyRequestRequest } from '../types/PhotoIdVerifyRequest';
import {
  PhotoIdVerificationResponse,
  photoIdVerificationResponseResponse,
} from '../../../types/PhotoIdVerificationResponse';
import {
  EvisaVerificationInput,
  evisaVerificationInputRequest,
} from '../../../types/EvisaVerificationInput';
import {
  EvisaVerificationResponse,
  evisaVerificationResponseResponse,
} from '../../../types/EvisaVerificationResponse';

export declare namespace VerifyClient {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for Verify operations.
 * Provides methods to interact with Verify-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class VerifyClient extends BaseService {
  protected supportingDocumentConfig?: Partial<BaseClientOptions>;

  protected photoIdConfig?: Partial<BaseClientOptions>;

  protected evisaConfig?: Partial<BaseClientOptions>;

  /**
   * Sets method-level configuration for supportingDocument.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setSupportingDocumentConfig(config: Partial<BaseClientOptions>): this {
    this.supportingDocumentConfig = config;
    return this;
  }

  /**
   * Sets method-level configuration for photoId.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setPhotoIdConfig(config: Partial<BaseClientOptions>): this {
    this.photoIdConfig = config;
    return this;
  }

  /**
   * Sets method-level configuration for evisa.
   * @param config - Partial configuration to override service-level defaults
   * @returns This service instance for method chaining
   */
  protected setEvisaConfig(config: Partial<BaseClientOptions>): this {
    this.evisaConfig = config;
    return this;
  }

  /**
 * **Experimental (beta):** This feature is new and currently in beta.
Extract and validate a supporting document.

This endpoint accepts a document file (PDF, JPG, or PNG) and extracts personal identity information and address details.

Extracted addresses are returned both as a flat `first_line_of_address`/`postcode` pair and as structured
`addresses_formatted` (`residence_number`, `building_name`, `street`, `city`, `postcode`, `region`) — the same
name and shape as in the postcode search endpoint. Extraction produces at most one address;
`addresses_formatted` is empty when no address fields were extracted.

**Request format:** This endpoint accepts `multipart/form-data` with:
- `document` - The document file (PDF, JPG, or PNG, max 10MB)
- `sub_type` (required) - The type of document (e.g., `BankStatement`, `UtilityBill`). See "Supported document types" below.
- `minimum_document_length` (optional) - Minimum document age in months. Documents older than this will fail the `document_age_valid` check.

**Supported document types (`sub_type`):**
- `Payslip` - Employment payslips
- `PensionAnnualStatement` - Pension statements
- `BenefitsLetter` - Government benefits letters
- `HMPPSLetter` - Probation service letters
- `NHSLetter` - NHS correspondence
- `BankStatement` - Bank account statements
- `CreditCardStatement` - Credit card statements
- `MortgageStatement` - Mortgage statements
- `UtilityBill` - Gas, electricity, water bills
- `MobilePhoneBill` - Mobile phone bills

**Validations performed:**
- `required_fields_extracted` - Key identity fields were successfully extracted. These are: `first_name`, `last_name`, `first_line_of_address` and `postcode`
- `category_match` - Document matches the specified sub_type
- `document_age_valid` - Document is within acceptable age range (only if `minimum_document_length` provided)
- `document_complete_and_legible` - Document is complete and readable
- `tampering_signals_check` - No signs of document tampering detected

Sandbox testing:
In sandbox mode, the endpoint returns a mock "pass" response with sandbox values. No actual document processing occurs.

> **Request behaviour:** This is a synchronous endpoint. Processing typically takes 5-15 seconds
> depending on document complexity.

> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).
 * @param {VouchsafeApi.v1.SupportingDocumentVerifyRequest} request
 * @param {VerifyClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.SupportingDocumentVerificationResponse>} - Verification completed successfully
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.UnprocessableEntityError}
 * @throws {@link VouchsafeApi.ServiceUnavailableError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verify.supportingDocument({
 *         document: fs.createReadStream("/path/to/your/file"),
 *         sub_type: "sub_type"
 *     })
 */
  supportingDocument(
    request: VouchsafeApi.v1.SupportingDocumentVerifyRequest,
    requestOptions?: VerifyClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.SupportingDocumentVerificationResponse> {
    return HttpResponsePromise.fromPromise(this.__supportingDocument(request, requestOptions));
  }
  private async __supportingDocument(
    request: VouchsafeApi.v1.SupportingDocumentVerifyRequest,
    requestOptions?: VerifyClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.SupportingDocumentVerificationResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.supportingDocumentConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/verify/supporting-documents')
      .setRequestSchema(supportingDocumentVerifyRequestRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.MultipartFormData)
      .addResponse({
        schema: supportingDocumentVerificationResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.SupportingDocumentVerificationResponse>(
      _request,
    );
  }

  /**
 * **Experimental (beta):** This feature is new and currently in beta.
This endpoint extracts details from a photo ID, validates the fields, and optionally matches the document photo to a face scan.

You provide:
- `sub_type` (required) - must be one of:
   - `Passport`
   - `NationalId` (MRZ-enabled IDs only)
   - `DrivingLicence` (GB and EU countries)
   - `PASSCard` (including Citizencard and Young Scot)
   - `UnfamiliarPhotoId`
- `front` (required) - the front of the photo ID document.
- `back` (`NationalId` only) - the back of the photo ID document.
- `country_code` (`DrivingLicence` only) - the issuing country as an ISO 3166-1 alpha-2 (e.g. `GB`, `DE`, `FR`).
- `face_scan` (optional) - a face image to compare with the photo on the document.

> **File requirements:** Max 10MB per file; JPEG or PNG only.

> **Sandbox testing:** In sandbox mode, the endpoint returns a mock “pass” response. It echoes back your reference values. It does not process the document.
 * @param {VouchsafeApi.v1.PhotoIdVerifyRequest} request
 * @param {VerifyClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.PhotoIdVerificationResponse>} - Verification completed successfully
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.UnprocessableEntityError}
 * @throws {@link VouchsafeApi.NotImplementedError}
 * @throws {@link VouchsafeApi.ServiceUnavailableError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verify.photoId({
 *         sub_type: "sub_type",
 *         front: fs.createReadStream("/path/to/your/file")
 *     })
 */
  photoId(
    request: VouchsafeApi.v1.PhotoIdVerifyRequest,
    requestOptions?: VerifyClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.PhotoIdVerificationResponse> {
    return HttpResponsePromise.fromPromise(this.__photoId(request, requestOptions));
  }
  private async __photoId(
    request: VouchsafeApi.v1.PhotoIdVerifyRequest,
    requestOptions?: VerifyClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.PhotoIdVerificationResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.photoIdConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/verify/photo-id')
      .setRequestSchema(photoIdVerifyRequestRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.MultipartFormData)
      .addResponse({
        schema: photoIdVerificationResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.PhotoIdVerificationResponse>(_request);
  }

  /**
 * Verify a person's UK eVisa using their Home Office share code.
This endpoint allows you to verify a person's `immigration status`, `right to work`, or `right to rent` eVisa
by providing their share code and date of birth. The share code is obtained by
the individual from the UK Home Office online service.

**Supported verification types:**
- `ImmigrationStatus` - Check a person's immigration status (e.g., Settled, Skilled Worker, Youth Mobility Scheme)
- `RightToWork` - Check a person's right to work in the UK
- `RightToRent` - Check a person's right to rent property in the UK

**Share code format:**
Each share code begins with a letter that identifies its type. Submitting a code whose prefix does not
match the requested `sub_type` returns `HTTP 400` with a `payload.share_code` error detail.
| sub_type | Expected prefix |
|----------|-----------------|
| `ImmigrationStatus` | `S` |
| `RightToWork` | `W` |
| `RightToRent` | `R` |

> **Request behaviour:** This is a synchronous endpoint. It can take up to 20 seconds.

**Response summary:**
| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| `200` | Verification completed | Check the `outcome` field (`pass`, `fail`, or `inconclusive`) |
| `422` | Share code locked out by GOV.UK | Retry with a new share code |
| `503` | Service temporarily unavailable | Retry with exponential backoff |

**Billing:**
An API call is billable when the eVisa was found on GOV.UK, regardless of whether the verification
outcome is `pass`, `fail`, or `inconclusive`. If the `share_code` or `date_of_birth` is invalid and no eVisa can be
retrieved, the response will have `billable: false` and you will not be charged.
Error responses (`HTTP 422`, `HTTP 503`) are also not billable and return an Error response body.

**Artefacts:**
On a successful response, artefacts are returned inline with pre-signed download URLs.
You have **30 minutes** to download them before the URLs expire.


**Sandbox testing:**
Use these share codes in [sandbox mode](https://help.vouchsafe.id/en/articles/11979598-how-does-sandbox-mode-work) to test different outcomes:
> Sandbox codes are exempt from the prefix check — they work with any `sub_type`.
- `PASS12345` - Returns a successful verification with "Pass" outcome
- `FAIL12345` - Returns a failed verification (e.g. expired status)
- `INC123456` - Returns an inconclusive verification (unrecognised indefinite immigration status)
- `ERROR1234` - Returns an error response
- `BADCODE12` - Returns a non-billable failed verification (e.g. invalid share code)
- `WRONGDOB1` - Returns a non-billable failed verification (e.g. wrong date of birth)
**Response fields by outcome:**
- `pass`: all fields for the sub-type will be populated.
- `fail`: `extracted_details` may be partially populated or empty depending on which validation step failed.
- `inconclusive`: all identity fields are populated but date-based validations could not be performed.

**Inconclusive outcome (`ImmigrationStatus` only):**
Some immigration statuses are indefinite (i.e. they have no expiry date or start date on GOV.UK) but are not yet on our recognised list. In this case the eVisa is successfully retrieved and all identity details are returned, but the date validations (`evisa_started`, `evisa_not_expired`) cannot be performed. The response will have:
- `outcome: "inconclusive"`
- `evisa_started` and `evisa_not_expired` both with `status: "inconclusive"` and `failed_reasons: ["UNRECOGNISED_INDEFINITE_STATUS"]`
- `expiration_date: null` and `valid_from: null` in `extracted_details`

**eVisa conditions:**
> This feature is experimental and only available for `RightToWork` eVisas.
The `evisa_conditions` object (within the `extracted_details` object) contains certain employment conditions extracted
verbatim from the eVisa text or `null` if that condition could not be extracted from the eVisa.

Always check `extraction_success` before using the object:
- **`true`**: conditions were successfully extracted — each non-null value is a verbatim quote from the eVisa
- **`false`**: extraction could not be performed — manually review the conditions on the eVisa

**Available fields:**

- `max_weekly_hours` (string | null): verbatim phrase stating a limit on weekly working hours, or `null` if uncapped.
  Covers both primary job caps (e.g. student term-time limit) and additional part-time caps (e.g. sponsored workers).

- `no_self_employment` (string | null): verbatim phrase prohibiting running a business or being self-employed,
  or `null` if no such prohibition is stated.
 * @param {VouchsafeApi.v1.EvisaVerificationInput} request
 * @param {VerifyClient.RequestOptions} [requestOptions] - Request-specific configuration.
 * @returns {HttpResponsePromise<VouchsafeApi.v1.EvisaVerificationResponse>} - Verification completed
 *
 * @throws {@link VouchsafeApi.BadRequestError}
 * @throws {@link VouchsafeApi.UnauthorizedError}
 * @throws {@link VouchsafeApi.ForbiddenError}
 * @throws {@link VouchsafeApi.UnprocessableEntityError}
 * @throws {@link VouchsafeApi.ServiceUnavailableError}
 * @throws {@link errors.VouchsafeApiError}
 * @throws {@link errors.VouchsafeApiTimeoutError}
 *
 * @example
 *     await client.v1.verify.evisa({
 *         sub_type: "ImmigrationStatus",
 *         payload: {
 *             reason: "Education or training",
 *             job_title: "Compliance Officer",
 *             company_name: "Sandbox Company",
 *             date_of_birth: "1996-06-07",
 *             share_code: "PASS12345"
 *         }
 *     })
 */
  evisa(
    request: VouchsafeApi.v1.EvisaVerificationInput,
    requestOptions?: VerifyClient.RequestOptions,
  ): HttpResponsePromise<VouchsafeApi.v1.EvisaVerificationResponse> {
    return HttpResponsePromise.fromPromise(this.__evisa(request, requestOptions));
  }
  private async __evisa(
    request: VouchsafeApi.v1.EvisaVerificationInput,
    requestOptions?: VerifyClient.RequestOptions,
  ): Promise<WithRawResponse<VouchsafeApi.v1.EvisaVerificationResponse>> {
    const resolvedConfig = this.getResolvedConfig(this.evisaConfig, requestOptions);
    const resolvedBaseUrl = await Supplier.get(
      resolvedConfig.baseUrl ??
        ((await Supplier.get(resolvedConfig.environment)) ?? VouchsafeApiEnvironment.Production).v1,
    );
    const resolvedHeaders = await resolveHeaders(resolvedConfig.headers);
    const _request = new RequestBuilder()
      .setConfig({ ...resolvedConfig, headers: resolvedHeaders })
      .setBaseUrl(resolvedBaseUrl)
      .setMethod('POST')
      .setPath('/verify/evisa')
      .setRequestSchema(evisaVerificationInputRequest)
      .setScopes([])
      .setTokenManager(this.tokenManager)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: evisaVerificationResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(request)
      .build();
    return this.client.callWithRawResponse<VouchsafeApi.v1.EvisaVerificationResponse>(_request);
  }
}
