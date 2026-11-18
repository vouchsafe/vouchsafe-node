import * as core from '../../../../core';
import {
  EvisaConditionsApiResponse,
  evisaConditionsApiResponse,
  evisaConditionsApiResponseRequest,
  evisaConditionsApiResponseResponse,
} from './EvisaConditionsApiResponse';

/**
 * Extracted details for `RightToWork` — includes all base fields plus optional `evisa_conditions`.
 */
export interface RightToWorkExtractedDetails {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  share_code?: string;
  reference_number?: string;
  /** Expiration date in `yyyy-MM-dd` format, or `null` for indefinite statuses (e.g. Settled, ILR). */
  expiration_date?: string | null;
  evisa_conditions?: EvisaConditionsApiResponse;
}

/**
 * Cast schema for the RightToWorkExtractedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToWorkExtractedDetails = core.cast.identity<RightToWorkExtractedDetails>();

/**
 * Cast schema for mapping API responses to the RightToWorkExtractedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToWorkExtractedDetailsResponse = core.cast.object((raw: any): any => {
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
    'evisa_conditions',
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
    evisa_conditions: raw['evisa_conditions'],
  };
}, []);

/**
 * Cast schema for mapping the RightToWorkExtractedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToWorkExtractedDetailsRequest = core.cast.object((raw: any): any => {
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
    evisa_conditions: raw['evisa_conditions'],
  };
}, []);
