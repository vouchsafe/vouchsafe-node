import * as core from '../../../../core';

export interface AddressInput {
  /** The street number, with any flat or unit number in front, e.g. `"10"` or `"Flat 2, 10"`.

Required for the credit bureau check, unless `building_name` is provided. */
  residence_number?: string;
  /** The name of the building, e.g. `"Rose Cottage"` or `"Rose Court"`.

Required for the credit bureau check, unless `residence_number` is provided. */
  building_name?: string;
  /** The street or road name. Optional, but leaving it out may lower match rates. */
  street?: string;
  /** The city or town. Required for CreditBureau. */
  city?: string;
  /** The postcode. Required for CreditBureau. */
  postcode?: string;
  /** The state, province or county. Optional. */
  region?: string;
  /** The two-letter ISO 3166-1 alpha-2 country code, e.g. `"GB"`. Required for CreditBureau. */
  country_code?: string;
}

/**
 * Cast schema for the AddressInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const addressInput = core.cast.identity<AddressInput>();

/**
 * Cast schema for mapping API responses to the AddressInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const addressInputResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'residence_number',
    'building_name',
    'street',
    'city',
    'postcode',
    'region',
    'country_code',
  ]);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    residence_number: raw['residence_number'],
    building_name: raw['building_name'],
    street: raw['street'],
    city: raw['city'],
    postcode: raw['postcode'],
    region: raw['region'],
    country_code: raw['country_code'],
  };
}, []);

/**
 * Cast schema for mapping the AddressInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const addressInputRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    residence_number: raw['residence_number'],
    building_name: raw['building_name'],
    street: raw['street'],
    city: raw['city'],
    postcode: raw['postcode'],
    region: raw['region'],
    country_code: raw['country_code'],
  };
}, []);
