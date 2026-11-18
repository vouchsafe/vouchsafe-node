import * as core from '../../../../core';

/**
 * Extracted details for `RightToRent` — includes all base fields plus `valid_from`.
 */
export interface RightToRentExtractedDetails {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  share_code?: string;
  reference_number?: string;
  /** Expiration date in `yyyy-MM-dd` format, or `null` for indefinite statuses (e.g. Settled, ILR). */
  expiration_date?: string | null;
  /** Start date in `yyyy-MM-dd` format, or `null` for indefinite statuses (e.g. Settled, ILR).
Only returned for `ImmigrationStatus` and `RightToRent` sub-types — not returned for `RightToWork`. */
  valid_from?: string | null;
}

/**
 * Cast schema for the RightToRentExtractedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToRentExtractedDetails = core.cast.identity<RightToRentExtractedDetails>();

/**
 * Cast schema for mapping API responses to the RightToRentExtractedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToRentExtractedDetailsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'first_name',
    'last_name',
    'date_of_birth',
    'share_code',
    'reference_number',
    'expiration_date',
    'valid_from',
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
    share_code: raw['share_code'],
    reference_number: raw['reference_number'],
    expiration_date: raw['expiration_date'],
    valid_from: raw['valid_from'],
  };
}, []);

/**
 * Cast schema for mapping the RightToRentExtractedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToRentExtractedDetailsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    first_name: raw['first_name'],
    last_name: raw['last_name'],
    date_of_birth: raw['date_of_birth'],
    share_code: raw['share_code'],
    reference_number: raw['reference_number'],
    expiration_date: raw['expiration_date'],
    valid_from: raw['valid_from'],
  };
}, []);
