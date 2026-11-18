import * as core from '../../../../../../core';

export interface CheckRiskRequest {
  /** Given name(s). Required. */
  first_name: string;
  /** Family name. Required. */
  last_name: string;
  /** Email address. Required. */
  email: string;
  /** Date of birth in YYYY-MM-DD format. Required. */
  date_of_birth: string;
  /** JSON-encoded array of optional enrichment checks to run.
Accepted values: `"OFFICIAL_RECORDS"`, `"ONLINE_FOOTPRINT"`, `"AML"`, `"ADVERSE_MEDIA"`.

`"CREDIT_BUREAU"` is deprecated. */
  enrichments?: string;
  /** Required when `enrichments` includes `"OFFICIAL_RECORDS"`.

Must include `residence_number` (or `building_name`), `postcode`, `city` and `country_code`. `street` is optional, but omitting it may affect match rates.

The easiest way to get a valid address is to pass a result from `GET /postcode`.

Example: a house, `10 Downing Street, London, SW1A 2AA`:
```json
{
  "residence_number": "10",
  "building_name": null,
  "street": "Downing Street",
  "city": "London",
  "postcode": "SW1A 2AA",
  "region": null,
  "country_code": "GB"
}
```

Example: a flat in a named building, `Flat 2, Rose Court, 10 Downing Street, London, SW1A 2AA`:
```json
{
  "residence_number": "Flat 2, 10",
  "building_name": "Rose Court",
  "street": "Downing Street",
  "city": "London",
  "postcode": "SW1A 2AA",
  "region": null,
  "country_code": "GB"
}
``` */
  address?: string;
  /** The person's phone number, in E.164 format (e.g. `+447700900123`). Numbers without a country code are treated as UK numbers.

Improves match rates for `ONLINE_FOOTPRINT` and, for UK numbers, `OFFICIAL_RECORDS`.

If we can't read the number, the request still succeeds, but `PHONE_SCORE` returns `NOT_PERFORMED` with reason `INVALID_PHONE_FORMAT`. */
  phone?: string;
  /** JSON-encoded object setting the pass/fail thresholds for enrichment checks. Both keys are optional.

| Key | Accepts | Default |
|---|---|---|
| `online_footprint` | Number from 0 to 100. Pass/fail threshold for `ONLINE_FOOTPRINT`. | 50 |
| `aml` | Number from 0 to 100. Pass/fail threshold for `AML`. | 96 |

```json
{ "online_footprint": 50, "aml": 96 }
``` */
  thresholds?: string;
  /** Face scan image (JPEG or PNG, max 10 MB). Optional binary file field. */
  face_scan?: core.file.Uploadable;
}

/**
 * Cast schema for the CheckRiskRequest model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const checkRiskRequest = core.cast.identity<CheckRiskRequest>();

/**
 * Cast schema for mapping API responses to the CheckRiskRequest application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const checkRiskRequestResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'email',
      'date_of_birth',
      'enrichments',
      'address',
      'phone',
      'thresholds',
      'face_scan',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      email: raw['email'],
      date_of_birth: raw['date_of_birth'],
      enrichments: raw['enrichments'],
      address: raw['address'],
      phone: raw['phone'],
      thresholds: raw['thresholds'],
      face_scan: raw['face_scan'],
    };
  },
  ['first_name', 'last_name', 'email', 'date_of_birth'],
);

/**
 * Cast schema for mapping the CheckRiskRequest application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const checkRiskRequestRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      email: raw['email'],
      date_of_birth: raw['date_of_birth'],
      enrichments: raw['enrichments'],
      address: raw['address'],
      phone: raw['phone'],
      thresholds: raw['thresholds'],
      face_scan: raw['face_scan'],
    };
  },
  ['first_name', 'last_name', 'email', 'date_of_birth'],
);
