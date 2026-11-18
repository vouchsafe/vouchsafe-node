# Reference

## Verify

<details><summary><code>client.v1.verify.<a href="/src/api/resources/v1/resources/verify/client/Client.ts">supportingDocument</a>({ ...params }) -> VouchsafeApi.SupportingDocumentVerificationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Experimental (beta):** This feature is new and currently in beta. Extract and validate a supporting document. This endpoint accepts a document file (PDF, JPG, or PNG) and extracts personal identity information and address details. Extracted addresses are returned both as a flat `first_line_of_address`/`postcode` pair and as structured `addresses_formatted` (`residence_number`, `building_name`, `street`, `city`, `postcode`, `region`) — the same name and shape as in the postcode search endpoint. Extraction produces at most one address; `addresses_formatted` is empty when no address fields were extracted. **Request format:** This endpoint accepts `multipart/form-data` with: - `document` - The document file (PDF, JPG, or PNG, max 10MB) - `sub_type` (required) - The type of document (e.g., `BankStatement`, `UtilityBill`). See "Supported document types" below. - `minimum_document_length` (optional) - Minimum document age in months. Documents older than this will fail the `document_age_valid` check. **Supported document types (`sub_type`):** - `Payslip` - Employment payslips - `PensionAnnualStatement` - Pension statements - `BenefitsLetter` - Government benefits letters - `HMPPSLetter` - Probation service letters - `NHSLetter` - NHS correspondence - `BankStatement` - Bank account statements - `CreditCardStatement` - Credit card statements - `MortgageStatement` - Mortgage statements - `UtilityBill` - Gas, electricity, water bills - `MobilePhoneBill` - Mobile phone bills **Validations performed:** - `required_fields_extracted` - Key identity fields were successfully extracted. These are: `first_name`, `last_name`, `first_line_of_address` and `postcode` - `category_match` - Document matches the specified sub_type - `document_age_valid` - Document is within acceptable age range (only if `minimum_document_length` provided) - `document_complete_and_legible` - Document is complete and readable - `tampering_signals_check` - No signs of document tampering detected Sandbox testing: In sandbox mode, the endpoint returns a mock "pass" response with sandbox values. No actual document processing occurs. \> **Request behaviour:** This is a synchronous endpoint. Processing typically takes 5-15 seconds \> depending on document complexity. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verify.supportingDocument({
  document: new ArrayBuffer(0),
  sub_type: 'sub_type',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.SupportingDocumentVerifyRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerifyClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.verify.<a href="/src/api/resources/v1/resources/verify/client/Client.ts">photoId</a>({ ...params }) -> VouchsafeApi.PhotoIdVerificationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Experimental (beta):** This feature is new and currently in beta. This endpoint extracts details from a photo ID, validates the fields, and optionally matches the document photo to a face scan. You provide: - `sub_type` (required) - must be one of: - `Passport` - `NationalId` (MRZ-enabled IDs only) - `DrivingLicence` (GB and EU countries) - `PASSCard` (including Citizencard and Young Scot) - `UnfamiliarPhotoId` - `front` (required) - the front of the photo ID document. - `back` (`NationalId` only) - the back of the photo ID document. - `country_code` (`DrivingLicence` only) - the issuing country as an ISO 3166-1 alpha-2 (e.g. `GB`, `DE`, `FR`). - `face_scan` (optional) - a face image to compare with the photo on the document. \> **File requirements:** Max 10MB per file; JPEG or PNG only. \> **Sandbox testing:** In sandbox mode, the endpoint returns a mock “pass” response. It echoes back your reference values. It does not process the document.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verify.photoId({
  sub_type: 'sub_type',
  front: new ArrayBuffer(0),
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.PhotoIdVerifyRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerifyClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.verify.<a href="/src/api/resources/v1/resources/verify/client/Client.ts">evisa</a>({ ...params }) -> VouchsafeApi.EvisaVerificationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Verify a person's UK eVisa using their Home Office share code. This endpoint allows you to verify a person's `immigration status`, `right to work`, or `right to rent` eVisa by providing their share code and date of birth. The share code is obtained by the individual from the UK Home Office online service. **Supported verification types:** - `ImmigrationStatus` - Check a person's immigration status (e.g., Settled, Skilled Worker, Youth Mobility Scheme) - `RightToWork` - Check a person's right to work in the UK - `RightToRent` - Check a person's right to rent property in the UK **Share code format:** Each share code begins with a letter that identifies its type. Submitting a code whose prefix does not match the requested `sub_type` returns `HTTP 400` with a `payload.share_code` error detail. \| sub_type \| Expected prefix \| \|----------\|-----------------\| \| `ImmigrationStatus` \| `S` \| \| `RightToWork` \| `W` \| \| `RightToRent` \| `R` \| \> **Request behaviour:** This is a synchronous endpoint. It can take up to 20 seconds. **Response summary:** \| HTTP Status \| Meaning \| Action \| \|-------------\|---------\|--------\| \| `200` \| Verification completed \| Check the `outcome` field (`pass`, `fail`, or `inconclusive`) \| \| `422` \| Share code locked out by GOV.UK \| Retry with a new share code \| \| `503` \| Service temporarily unavailable \| Retry with exponential backoff \| **Billing:** An API call is billable when the eVisa was found on GOV.UK, regardless of whether the verification outcome is `pass`, `fail`, or `inconclusive`. If the `share_code` or `date_of_birth` is invalid and no eVisa can be retrieved, the response will have `billable: false` and you will not be charged. Error responses (`HTTP 422`, `HTTP 503`) are also not billable and return an Error response body. **Artefacts:** On a successful response, artefacts are returned inline with pre-signed download URLs. You have **30 minutes** to download them before the URLs expire. **Sandbox testing:** Use these share codes in [sandbox mode](https://help.vouchsafe.id/en/articles/11979598-how-does-sandbox-mode-work) to test different outcomes: \> Sandbox codes are exempt from the prefix check — they work with any `sub_type`. - `PASS12345` - Returns a successful verification with "Pass" outcome - `FAIL12345` - Returns a failed verification (e.g. expired status) - `INC123456` - Returns an inconclusive verification (unrecognised indefinite immigration status) - `ERROR1234` - Returns an error response - `BADCODE12` - Returns a non-billable failed verification (e.g. invalid share code) - `WRONGDOB1` - Returns a non-billable failed verification (e.g. wrong date of birth) **Response fields by outcome:** - `pass`: all fields for the sub-type will be populated. - `fail`: `extracted_details` may be partially populated or empty depending on which validation step failed. - `inconclusive`: all identity fields are populated but date-based validations could not be performed. **Inconclusive outcome (`ImmigrationStatus` only):** Some immigration statuses are indefinite (i.e. they have no expiry date or start date on GOV.UK) but are not yet on our recognised list. In this case the eVisa is successfully retrieved and all identity details are returned, but the date validations (`evisa_started`, `evisa_not_expired`) cannot be performed. The response will have: - `outcome: "inconclusive"` - `evisa_started` and `evisa_not_expired` both with `status: "inconclusive"` and `failed_reasons: ["UNRECOGNISED_INDEFINITE_STATUS"]` - `expiration_date: null` and `valid_from: null` in `extracted_details` **eVisa conditions:** \> This feature is experimental and only available for `RightToWork` eVisas. The `evisa_conditions` object (within the `extracted_details` object) contains certain employment conditions extracted verbatim from the eVisa text or `null` if that condition could not be extracted from the eVisa. Always check `extraction_success` before using the object: - **`true`**: conditions were successfully extracted — each non-null value is a verbatim quote from the eVisa - **`false`**: extraction could not be performed — manually review the conditions on the eVisa **Available fields:** - `max_weekly_hours` (string \| null): verbatim phrase stating a limit on weekly working hours, or `null` if uncapped. Covers both primary job caps (e.g. student term-time limit) and additional part-time caps (e.g. sponsored workers). - `no_self_employment` (string \| null): verbatim phrase prohibiting running a business or being self-employed, or `null` if no such prohibition is stated.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verify.evisa({
  sub_type: 'ImmigrationStatus',
  payload: {
    reason: 'Education or training',
    job_title: 'Compliance Officer',
    company_name: 'Sandbox Company',
    date_of_birth: '1996-06-07',
    share_code: 'PASS12345',
  },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.EvisaVerificationInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerifyClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Verifications

<details><summary><code>client.v1.verifications.<a href="/src/api/resources/v1/resources/verifications/client/Client.ts">list</a>({ ...params }) -> VouchsafeApi.ListVerificationsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all verifications for your team. This can be a long list, so filtering by status is recommended. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verifications.list({
  status: 'InProgress',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.ListVerificationsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerificationsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.verifications.<a href="/src/api/resources/v1/resources/verifications/client/Client.ts">request</a>({ ...params }) -> VouchsafeApi.RequestVerificationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Request a new verification. Provide the user's email and the ID of one of your verification flows to send them through. Vouchsafe will respond with: - a URL to redirect to the user to - a unique ID for you to track the verification If you have enabled "On request creation" emails in your flow, this also sends them an email. You can optionally provide more information/claims about the user, like their name, date of birth and address. Any that are provided will be checked against evidence the user gives. If you do provide additional information about your user, you should let them know the information you are expecting them to verify. This helps prevent users getting stuck when the evidence they have does not match what you have provided. #### Existing verifications If a user already has an in progress verification for the same email address and flow, a new verification is not created. To start a new verification for that user in the same flow, first cancel their existing verification using the [CancelVerification](https://docs.vouchsafe.id/api/v1/cancel-verification) endpoint. #### Expiry Verifications expire after the window configured on your flow (default: **7 days** from creation). Once expired, the verification link stops working and the verification will show as **Expired** in your dashboard. v You can override the expiry for a specific verification using the `expires_at` field. Provide an **ISO 8601 timestamp** (e.g. `2025-08-08T12:00:00Z`). **Recommendation:** If you use this field, make sure the window is long enough for the user to receive and complete the verification - we recommend **at least 1 day**. Otherwise, omit `expires_at` and the default flow expiry window will be used. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verifications.request({
  email: 'email',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.RequestVerificationInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerificationsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.verifications.<a href="/src/api/resources/v1/resources/verifications/client/Client.ts">get</a>({ ...params }) -> VouchsafeApi.GetVerificationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a single verification by ID. Returns the latest status, claim details and results for a verification you previously requested. Vouchsafe will respond with: - the verification status and timestamps - the identity claim details (e.g. name, email, phone number) - the list of checks performed (e.g. liveness, photo ID, email verification) including outcomes and validations - results of any background checks (e.g. radar, online footprint analysis, aml sanctions) #### Downloading files (artefacts) Some checks may include an `artefacts` array (for example: face scan or document images). For security reasons, the verification response only contains an `artefact key` — not the file itself. To download an artefact, use: - `GET /artefacts/{artefact_key}` This returns a **time-limited pre-signed URL** which can be used to download the file. #### Erased verifications If the data subject has exercised their right to erasure, the verification's `erased_at` timestamp will be set, and `erased_by` records the operator who ran the erasure. The verification's `status` and timestamps are retained so you keep an audit trail, but all personal data (claim details, extracted document details, artefacts and enrichments) will be empty. Check `erased_at` to distinguish an erased verification from one that simply never collected that data. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verifications.get({
  id: 'id',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.GetVerificationsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerificationsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.verifications.<a href="/src/api/resources/v1/resources/verifications/client/Client.ts">cancel</a>({ ...params }) -> VouchsafeApi.GetVerificationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Cancel an in progress verification. Only verifications with a status of `InProgress` can be cancelled. Any other status returns a `409`. Once cancelled, requesting a verification for the same email and flow creates a new verification. In sandbox mode, you can call this endpoint to see the response for each sandbox verification account. The request does not persist any changes, so the sample verification retains its original status. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.verifications.cancel({
  id: 'id',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.CancelVerificationsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerificationsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Team

<details><summary><code>client.v1.team.<a href="/src/api/resources/v1/resources/team/client/Client.ts">get</a>() -> VouchsafeApi.GetTeamResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the currently authenticated team. Helpful for testing, especially when managing multiple client IDs and secrets. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.team.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `TeamClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.team.<a href="/src/api/resources/v1/resources/team/client/Client.ts">create</a>({ ...params }) -> VouchsafeApi.CreateTeamResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new team (Partners only). Creates a new team with the specified configuration and admin users. Vouchsafe will respond with: - a unique team ID for tracking - the team name and public-facing name - client credentials to authenticate team API requests - creation timestamp (ISO 8601 format) The provided admin emails will be granted administrative access to manage the team's settings and workflows. **Note:** This endpoint requires a valid partner token in the `X-Partner-Token` header.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.team.create({
  X_Partner_Token: 'X-Partner-Token',
  name: 'name',
  team_admin_emails: ['team_admin_emails'],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.CreateTeamInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TeamClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## SmartLookups

<details><summary><code>client.v1.smartLookups.<a href="/src/api/resources/v1/resources/smartLookups/client/Client.ts">perform</a>({ ...params }) -> VouchsafeApi.GetSmartLookupResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Run quick [background checks](https://help.vouchsafe.id/en/articles/11075009-how-background-checks-work) on a user's details. Provide the user's details and the check(s) to run and receive the report. First line of address should be taken from the results returned by the [`GET /postcode` endpoint](https://docs.vouchsafe.id/api/v1/search-postcode). The supported checks are: - `CreditBureau` checking credit reference agency data, plus public data like the electoral roll - `OnlineFootprint` checking against public traces of the user's online activity - `AML` checking international sanctions database, watchlists and other lists of high-risk people ### Caching and billing To make it easier to test and demo, if you run the same smart lookup query within four hours, your results will be cached and you will not be charged again. The `billable` field in the response body indicates whether tokens were charged for this call. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://help.vouchsafe.id/en/articles/11979598-how-does-sandbox-mode-work).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.smartLookups.perform({
  first_name: 'first_name',
  last_name: 'last_name',
  checks: ['CreditBureau'],
  thresholds: {
    aml: 96,
    onlineFootprint: 50,
  },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.SmartLookupInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SmartLookupsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.smartLookups.<a href="/src/api/resources/v1/resources/smartLookups/client/Client.ts">searchPostcode</a>({ ...params }) -> VouchsafeApi.PostcodeResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up all addresses for a given UK postcode. Useful for guaranteeing that a user's address is recognised before onboarding. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.smartLookups.searchPostcode({
  postcode: 'postcode',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.SearchPostcodeRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SmartLookupsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Flows

<details><summary><code>client.v1.flows.<a href="/src/api/resources/v1/resources/flows/client/Client.ts">list</a>() -> VouchsafeApi.ListFlowsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a list of all the currently published verification flows. Use an ID from one of these flows to request verifications with the [`POST /verifications` endpoint](https://app.vouchsafe.id/docs/operations/RequestVerification). Referee-specific verification flows cannot be started independently, so are not returned by this endpoint. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.flows.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `FlowsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.flows.<a href="/src/api/resources/v1/resources/flows/client/Client.ts">get</a>({ ...params }) -> VouchsafeApi.GetFlowResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a specific verification flow. Use an ID from one of these flows to request verifications with the [`POST /verifications` endpoint](https://app.vouchsafe.id/docs/operations/RequestVerification). \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.flows.get({
  id: 'id',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.GetFlowsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FlowsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Coverage

<details><summary><code>client.v1.coverage.<a href="/src/api/resources/v1/resources/coverage/client/Client.ts">list</a>({ ...params }) -> VouchsafeApi.ListCoverageResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the digital ID schemes, photo IDs, supporting documents and trusted data sources Vouchsafe covers, optionally filtered by country and/or type. Each item is listed once, with every jurisdiction it applies to in `country_codes`. Items that apply everywhere (e.g. passports, or supporting documents which aren't restricted by country) have an empty `country_codes` array. DIGITAL_ID includes our full digital ID provider catalog, not just the providers Vouchsafe has a working verification flow for — `id` is `null` for anything that can't be submitted anywhere today.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.coverage.list({
  country_code: 'country_code',
  type: 'DIGITAL_ID',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.ListCoverageRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CoverageClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Authentication

<details><summary><code>client.v1.authentication.<a href="/src/api/resources/v1/resources/authentication/client/Client.ts">authenticate</a>({ ...params }) -> VouchsafeApi.AuthenticateResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the access token, needed for all other API requests. You will need your client ID and secret from the **API Integration** tab of the Vouchsafe dashboard. Each access token is valid for 24 hours, after which you will need to re-authenticate. Once you have an access token, pass it in future requests as a [Bearer token](https://workos.com/blog/understanding-bearer-tokens) in an `Authorization` header. Use an [SDK or library](https://help.vouchsafe.id/en/articles/12026847-vouchsafe-sdks-and-libraries) to simplify handling tokens \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.authentication.authenticate({
  client_id: 'client_id',
  client_secret: 'client_secret',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.AuthenticateInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Artefacts

<details><summary><code>client.v1.artefacts.<a href="/src/api/resources/v1/resources/artefacts/client/Client.ts">get</a>({ ...params }) -> VouchsafeApi.GetArtefactsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get an artefact download link. For security reasons, other endpoints (e.g. `GET /verifications/{id}`) may return only an `artefact_key`. Use this endpoint to exchange that key for a **time-limited pre-signed URL** that can be used to download the file. You may also pass a **verification ID** in place of an artefact key. In that case Vouchsafe returns a pre-signed URL to that verification's downloadable **PDF report**. Reports are only available for fully-decided verifications (`Verified`, `ManuallyReviewed`, or `Refused`); any other state returns `409 Report not available`. Vouchsafe will respond with: - the requested `artefact_key` - a `download_url` (pre-signed and time-limited) - an `expires_at` timestamp (ISO 8601, UTC) **Note:** The `download_url` will stop working after `expires_at`. If it expires, request a new URL using this endpoint.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.artefacts.get({
  artefact_key: 'artefact_key',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.GetArtefactsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ArtefactsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Alerts

<details><summary><code>client.v1.alerts.<a href="/src/api/resources/v1/resources/alerts/client/Client.ts">listAccounts</a>({ ...params }) -> VouchsafeApi.ListAlertAccountsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List monitored accounts. Returns accounts that have ongoing AML/sanctions monitoring enabled, with summary info including current alert status. Use cursor-based pagination to iterate through results. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.alerts.listAccounts({
  status: 'new',
  cursor: 'cursor',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.ListAccountsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AlertsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.alerts.<a href="/src/api/resources/v1/resources/alerts/client/Client.ts">getAccount</a>({ ...params }) -> VouchsafeApi.AlertAccountDetailResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get full account detail. Returns the account's personal details and all alerts. Each alert has a `source` field that determines its shape: - `"AML"` - triggered by a sanctions/PEP screening hit. Populates `matches[]` with the matched entities. - `"FraudBlocklist"` - triggered by a match in our internal network. Populates `matched_on` with the datapoint that matched it (`"email"` and/or `"face"`). \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.alerts.getAccount({
  id: 'id',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.GetAccountAlertsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AlertsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.alerts.<a href="/src/api/resources/v1/resources/alerts/client/Client.ts">toggle</a>({ ...params }) -> VouchsafeApi.ToggleAlertsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Toggle ongoing monitoring for an account. Enable or disable AML/sanctions screening for an existing account. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.alerts.toggle({
  id: 'id',
  alerts_enabled: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.ToggleAlertsInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AlertsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.v1.alerts.<a href="/src/api/resources/v1/resources/alerts/client/Client.ts">acknowledge</a>({ ...params }) -> VouchsafeApi.AcknowledgeAlertResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Marks an alert as acknowledged. The acknowledgement will be attributed to the name of the API key used to make the request. This action is idempotent. Calling it on an already-acknowledged alert returns the original acknowledgement timestamp. The alert ID can be found in the webhook notification payload (`alertId`), or by calling `GET /v1/alerts/accounts/{id}` and reading the `id` field on an alert in the response. \> This endpoint supports sandbox mode. [See how sandbox mode works](https://docs.vouchsafe.id/sandbox).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.alerts.acknowledge({
  alertId: 'alertId',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.v1.AcknowledgeAlertsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AlertsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AdverseMedia

<details><summary><code>client.v1.adverseMedia.<a href="/src/api/resources/v1/resources/adverseMedia/client/Client.ts">check</a>({ ...params }) -> VouchsafeApi.AdverseMediaResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Experimental (beta):** This is a new endpoint. The interface or behaviour may change without notice. Screen an individual against recent news coverage for adverse or negative reporting. Each article returned by the search is scored from 0–100 by our AI screening model. Articles at or above the threshold are returned as `strong_matches` and cause the overall `status` to be `FAIL`. All articles found are also returned in `all_results` for audit purposes, including those that scored below the threshold. Providing a `location` is strongly recommended: it significantly improves search precision and reduces false positives for common names.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v1.adverseMedia.check({
  first_name: 'first_name',
  last_name: 'last_name',
  location: 'Glasgow',
  threshold: 70,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.AdverseMediaInput`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AdverseMediaClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Risk

<details><summary><code>client.v2.risk.<a href="/src/api/resources/v2/resources/risk/client/Client.ts">check</a>({ ...params }) -> VouchsafeApi.GetRiskResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This is Vouchsafe's headline Risk API. It gives you an instant picture of the identity fraud risk a customer represents, powered by our real-time fraud intelligence network and premium partner data. Pass the information you have about a customer, and Vouchsafe will scan our network for signs that an identity might be stolen, synthetic or otherwise risky, using verification data and shared reports made by other businesses using the platform. You can also run premium `enrichments`: - `OFFICIAL_RECORDS` will look for authoritative evidence of a claimed identity and address in official and semi-official databases from around the world, which you can use as an FCA-compliant eKYC onboarding process. - `ONLINE_FOOTPRINT` will analyse the identity's digital and online history, to determine if it is likely to be legitimate or recently made-up. - `AML` will search over [280 global databases](https://vouchsafe.id/coverage/) of high-risk entities connected to financial or economic crime, including sanctions, watchlists and politically exposed people. It also enrols the person in ongoing monitoring, reported as `alerts_enabled_at`. - `ADVERSE_MEDIA` searches news coverage for reported wrongdoing linked to fraud or financial crime. The more checks you turn on, the more complete the data you send needs to be. This endpoint always returns a `risk_score` between 0 and 100, and a `recommendation` based on that risk, along with extensive metadata so you can explore the discovered trust and risk signals. This endpoint can form the basis of a transaction monitoring or data-driven KYC/AML system. ### Recommendations Our Risk API returns one of three recommendations: `CLEAR`, `REVIEW`, and `REJECT`. ### Face scan Optionally send a `face_scan`: a live selfie or liveness image (JPEG or PNG, up to 10 MB). We'll check it against our fraud intelligence network to see whether the same face has been used under different identities. Without it, face-based checks are skipped. ### Address When the official records enrichment is turned on, a structured `address` is required. This should be taken from the results returned by the [`GET /postcode` endpoint](https://docs.vouchsafe.id/api/v1/search-postcode). See the `address` field below for how to split a flat, building name and street number. ### Sandbox In sandbox mode, `email` picks the recommendation you get back. \| `email` \| Recommendation \| \|---\|---\| \| contains `+reject` \| `REJECT` \| \| contains `+review` \| `REVIEW` \| \| anything else \| `CLEAR` \| The response echoes your input and includes only the enrichments you requested. Requested enrichments are shaped to match the outcome: - CLEAR: all pass - REVIEW: only the last requested enrichment fails - REJECT: all fail To return a record you can open in the sandbox dashboard, use `dwebb@email.com` (`CLEAR`), `jdoe@email.com` (`REVIEW`), or `eroberts@email.com` (`REJECT`).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.v2.risk.check({
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  date_of_birth: 'date_of_birth',
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VouchsafeApi.CheckRiskRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RiskClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
