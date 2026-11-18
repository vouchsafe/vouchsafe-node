import * as core from '../../../../core';

export interface PublicAddress {
  /** The street number, with any flat or unit number in front, e.g. `"10"` or `"Flat 2, 10"`. */
  residence_number?: string;
  /** The name of the building, e.g. `"Rose Cottage"` or `"Rose Court"`. */
  building_name?: string;
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
  /** State, province, or county. */
  region?: string;
  /** ISO 3166-1 alpha-2 country code. */
  country_code?: string;
}

/**
 * Cast schema for the PublicAddress model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const publicAddress = core.cast.identity<PublicAddress>();

/**
 * Cast schema for mapping API responses to the PublicAddress application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const publicAddressResponse = core.cast.object((raw: any): any => {
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
    country: raw['country'],
    region: raw['region'],
    country_code: raw['country_code'],
  };
}, []);

/**
 * Cast schema for mapping the PublicAddress application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const publicAddressRequest = core.cast.object((raw: any): any => {
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
    region: raw['region'],
    country_code: raw['country_code'],
  };
}, []);
