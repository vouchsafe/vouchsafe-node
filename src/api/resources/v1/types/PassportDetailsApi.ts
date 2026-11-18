import * as core from '../../../../core';

export interface PassportDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Date of birth, if extracted. Otherwise null. */
  date_of_birth: string | null;
  /** Passport number, if extracted. Otherwise null. */
  document_number: string | null;
  /** Expiry date, if present and extracted. Otherwise null. */
  expiration_date: string | null;
  /** Issue date, if present and extracted. Otherwise null. */
  issue_date?: string | null;
  /** Issuing country code, if extracted. Otherwise null. */
  issuing_country: string | null;
  /** Raw MRZ string, if extracted. Otherwise null. */
  mrz_code: string | null;
  /** ICAO MRZ format, if detected. Otherwise null. */
  icao_format: string | null;
}

/**
 * Cast schema for the PassportDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const passportDetailsApi = core.cast.identity<PassportDetailsApi>();

/**
 * Cast schema for mapping API responses to the PassportDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const passportDetailsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'date_of_birth',
      'document_number',
      'expiration_date',
      'issue_date',
      'issuing_country',
      'mrz_code',
      'icao_format',
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
      date_of_birth: raw['date_of_birth'],
      document_number: raw['document_number'],
      expiration_date: raw['expiration_date'],
      issue_date: raw['issue_date'],
      issuing_country: raw['issuing_country'],
      mrz_code: raw['mrz_code'],
      icao_format: raw['icao_format'],
    };
  },
  [
    'first_name',
    'last_name',
    'date_of_birth',
    'document_number',
    'expiration_date',
    'issuing_country',
    'mrz_code',
    'icao_format',
  ],
);

/**
 * Cast schema for mapping the PassportDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const passportDetailsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      document_number: raw['document_number'],
      expiration_date: raw['expiration_date'],
      issue_date: raw['issue_date'],
      issuing_country: raw['issuing_country'],
      mrz_code: raw['mrz_code'],
      icao_format: raw['icao_format'],
    };
  },
  [
    'first_name',
    'last_name',
    'date_of_birth',
    'document_number',
    'expiration_date',
    'issuing_country',
    'mrz_code',
    'icao_format',
  ],
);
