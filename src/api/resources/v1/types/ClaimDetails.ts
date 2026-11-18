import * as core from '../../../../core';
import { Address, address, addressRequest, addressResponse } from './Address';

export interface ClaimDetails {
  email: string | null;
  phone_number: string | null;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  address?: Address | null;
  /** To be deprecated. Use `address` instead. */
  first_line_of_address: string | null;
  /** To be deprecated. Use `address` instead. */
  postcode: string | null;
}

/**
 * Cast schema for the ClaimDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const claimDetails = core.cast.identity<ClaimDetails>();

/**
 * Cast schema for mapping API responses to the ClaimDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const claimDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'email',
      'phone_number',
      'first_name',
      'last_name',
      'date_of_birth',
      'address',
      'first_line_of_address',
      'postcode',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      email: raw['email'],
      phone_number: raw['phone_number'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      address: raw['address'] == null ? raw['address'] : addressResponse.parse(raw['address']),
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
    };
  },
  [
    'email',
    'phone_number',
    'first_name',
    'last_name',
    'date_of_birth',
    'first_line_of_address',
    'postcode',
  ],
);

/**
 * Cast schema for mapping the ClaimDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const claimDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      email: raw['email'],
      phone_number: raw['phone_number'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      address: raw['address'] == null ? raw['address'] : addressRequest.parse(raw['address']),
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
    };
  },
  [
    'email',
    'phone_number',
    'first_name',
    'last_name',
    'date_of_birth',
    'first_line_of_address',
    'postcode',
  ],
);
