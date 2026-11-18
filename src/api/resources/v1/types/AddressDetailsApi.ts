import * as core from '../../../../core';

/**
 * A person's address, split into separate fields.
Street and postcode can be empty — some countries' addresses don't have them.
 */
export interface AddressDetailsApi {
  /** House or flat number, e.g. "10" or "Flat 1". */
  residence_number?: string;
  /** House or building name, e.g. "Rose Cottage". */
  building_name?: string;
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
  /** ISO 3166-1 alpha-2 country code. */
  country_code?: string;
  /** State, province, or county. */
  region?: string;
}

/**
 * Cast schema for the AddressDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const addressDetailsApi = core.cast.identity<AddressDetailsApi>();

/**
 * Cast schema for mapping API responses to the AddressDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const addressDetailsApiResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'residence_number',
    'building_name',
    'street',
    'city',
    'postcode',
    'country',
    'country_code',
    'region',
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
    country: raw['country'],
    country_code: raw['country_code'],
    region: raw['region'],
  };
}, []);

/**
 * Cast schema for mapping the AddressDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const addressDetailsApiRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    residence_number: raw['residence_number'],
    building_name: raw['building_name'],
    street: raw['street'],
    city: raw['city'],
    postcode: raw['postcode'],
    country: raw['country'],
    country_code: raw['country_code'],
    region: raw['region'],
  };
}, []);
