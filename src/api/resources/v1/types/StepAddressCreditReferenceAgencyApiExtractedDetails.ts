import * as core from '../../../../core';
import { AddressSource, addressSource } from './AddressSource';
import {
  AddressDetailsApi,
  addressDetailsApi,
  addressDetailsApiRequest,
  addressDetailsApiResponse,
} from './AddressDetailsApi';

/**
 * The name and address checked with the official records.
 */
export interface StepAddressCreditReferenceAgencyApiExtractedDetails {
  address_source?: AddressSource | null;
  address: AddressDetailsApi | null;
  /** Postcode of the address. */
  postcode: string | null;
  /** First line of the address. */
  first_line_of_address: string | null;
  /** Last name that was checked against the official records. */
  last_name: string | null;
  /** First name that was checked against the official records. */
  first_name: string | null;
}

/**
 * Cast schema for the StepAddressCreditReferenceAgencyApiExtractedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepAddressCreditReferenceAgencyApiExtractedDetails =
  core.cast.identity<StepAddressCreditReferenceAgencyApiExtractedDetails>();

/**
 * Cast schema for mapping API responses to the StepAddressCreditReferenceAgencyApiExtractedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepAddressCreditReferenceAgencyApiExtractedDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'address_source',
      'address',
      'postcode',
      'first_line_of_address',
      'last_name',
      'first_name',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      address_source: raw['address_source'],
      address:
        raw['address'] == null ? raw['address'] : addressDetailsApiResponse.parse(raw['address']),
      postcode: raw['postcode'],
      first_line_of_address: raw['first_line_of_address'],
      last_name: raw['last_name'],
      first_name: raw['first_name'],
    };
  },
  ['address', 'postcode', 'first_line_of_address', 'last_name', 'first_name'],
);

/**
 * Cast schema for mapping the StepAddressCreditReferenceAgencyApiExtractedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepAddressCreditReferenceAgencyApiExtractedDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      address_source: raw['address_source'],
      address:
        raw['address'] == null ? raw['address'] : addressDetailsApiRequest.parse(raw['address']),
      postcode: raw['postcode'],
      first_line_of_address: raw['first_line_of_address'],
      last_name: raw['last_name'],
      first_name: raw['first_name'],
    };
  },
  ['address', 'postcode', 'first_line_of_address', 'last_name', 'first_name'],
);
