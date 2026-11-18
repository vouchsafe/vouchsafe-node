import * as core from '../../../../core';

/**
 * Structured address extracted from the supporting document.
Mirrors the `addresses_formatted` shape of GET /smart-lookups/postcode,
minus country fields — extraction does not determine a country.
 */
export interface SupportingDocumentExtractedAddress {
  residence_number?: string;
  building_name?: string;
  street?: string;
  city?: string;
  postcode?: string;
  /** State, province, or county. */
  region?: string;
}

/**
 * Cast schema for the SupportingDocumentExtractedAddress model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentExtractedAddress =
  core.cast.identity<SupportingDocumentExtractedAddress>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentExtractedAddress application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentExtractedAddressResponse = core.cast.object((raw: any): any => {
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
  };
}, []);

/**
 * Cast schema for mapping the SupportingDocumentExtractedAddress application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentExtractedAddressRequest = core.cast.object((raw: any): any => {
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
  };
}, []);
