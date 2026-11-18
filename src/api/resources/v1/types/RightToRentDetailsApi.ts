import * as core from '../../../../core';

export interface RightToRentDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Date of birth, if extracted. Otherwise null. */
  date_of_birth: string | null;
  /** Share code used to check a person's right to rent property in the UK. */
  share_code: string | null;
  /** GOV.UK reference number for the check, if evisa record was found. Otherwise null. */
  reference_number: string | null;
  /** Expiry date in yyyy-MM-dd, or null for indefinite statuses (for example Settled, ILR). */
  expiration_date: string | null;
  /** Start date in yyyy-MM-dd, or null for indefinite statuses (for example Settled, ILR). */
  issue_date: string | null;
}

/**
 * Cast schema for the RightToRentDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToRentDetailsApi = core.cast.identity<RightToRentDetailsApi>();

/**
 * Cast schema for mapping API responses to the RightToRentDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToRentDetailsApiResponse = core.cast.object(
  (raw: any): any => {
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
      'issue_date',
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
      issue_date: raw['issue_date'],
    };
  },
  [
    'first_name',
    'last_name',
    'date_of_birth',
    'share_code',
    'reference_number',
    'expiration_date',
    'issue_date',
  ],
);

/**
 * Cast schema for mapping the RightToRentDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToRentDetailsApiRequest = core.cast.object(
  (raw: any): any => {
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
      issue_date: raw['issue_date'],
    };
  },
  [
    'first_name',
    'last_name',
    'date_of_birth',
    'share_code',
    'reference_number',
    'expiration_date',
    'issue_date',
  ],
);
