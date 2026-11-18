import * as core from '../../../../core';
import {
  AddressDetailsApi,
  addressDetailsApi,
  addressDetailsApiRequest,
  addressDetailsApiResponse,
} from './AddressDetailsApi';

/**
 * The address returned by the provider.
 */
export interface StepAddressDigitalIdApiExtractedDetails {
  address: AddressDetailsApi | null;
  postcode: string | null;
  first_line_of_address: string | null;
}

/**
 * Cast schema for the StepAddressDigitalIdApiExtractedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepAddressDigitalIdApiExtractedDetails =
  core.cast.identity<StepAddressDigitalIdApiExtractedDetails>();

/**
 * Cast schema for mapping API responses to the StepAddressDigitalIdApiExtractedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepAddressDigitalIdApiExtractedDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['address', 'postcode', 'first_line_of_address']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      address:
        raw['address'] == null ? raw['address'] : addressDetailsApiResponse.parse(raw['address']),
      postcode: raw['postcode'],
      first_line_of_address: raw['first_line_of_address'],
    };
  },
  ['address', 'postcode', 'first_line_of_address'],
);

/**
 * Cast schema for mapping the StepAddressDigitalIdApiExtractedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepAddressDigitalIdApiExtractedDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      address:
        raw['address'] == null ? raw['address'] : addressDetailsApiRequest.parse(raw['address']),
      postcode: raw['postcode'],
      first_line_of_address: raw['first_line_of_address'],
    };
  },
  ['address', 'postcode', 'first_line_of_address'],
);
