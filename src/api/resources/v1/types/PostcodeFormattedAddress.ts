import * as core from '../../../../core';

export interface PostcodeFormattedAddress {
  /** The street number, with any flat or unit number in front, e.g. `"10"` or `"Flat 2, 10"`. At least one of `residence_number` or `building_name` is present when available. */
  residence_number?: string;
  /** The name of the building, e.g. `"Rose Cottage"` or `"Rose Court"`. At least one of `residence_number` or `building_name` is present when available. */
  building_name?: string;
  /** The street or road name. */
  street?: string;
  /** The city or town. */
  city?: string;
  /** The postcode. */
  postcode: string;
  /** The country name, e.g. `"United Kingdom"`. */
  country: string;
  /** The state, province or county. */
  region?: string;
  /** The two-letter ISO 3166-1 alpha-2 country code, e.g. `"GB"`. */
  country_code: string;
}

/**
 * Cast schema for the PostcodeFormattedAddress model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const postcodeFormattedAddress = core.cast.identity<PostcodeFormattedAddress>();

/**
 * Cast schema for mapping API responses to the PostcodeFormattedAddress application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const postcodeFormattedAddressResponse = core.cast.object(
  (raw: any): any => {
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
  },
  ['postcode', 'country', 'country_code'],
);

/**
 * Cast schema for mapping the PostcodeFormattedAddress application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const postcodeFormattedAddressRequest = core.cast.object(
  (raw: any): any => {
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
  },
  ['postcode', 'country', 'country_code'],
);
