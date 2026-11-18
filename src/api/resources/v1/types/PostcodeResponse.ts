import * as core from '../../../../core';
import {
  PostcodeFormattedAddress,
  postcodeFormattedAddress,
  postcodeFormattedAddressRequest,
  postcodeFormattedAddressResponse,
} from './PostcodeFormattedAddress';

export interface PostcodeResponse {
  /** Single-line addresses. */
  addresses: string[];
  /** Structured addresses. Feed straight into POST /smart-lookups. */
  addresses_formatted: PostcodeFormattedAddress[];
}

/**
 * Cast schema for the PostcodeResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const postcodeResponse = core.cast.identity<PostcodeResponse>();

/**
 * Cast schema for mapping API responses to the PostcodeResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const postcodeResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['addresses', 'addresses_formatted']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      addresses: raw['addresses'],
      addresses_formatted: Array.isArray(raw['addresses_formatted'])
        ? (raw['addresses_formatted'] as any[]).map((v: any) =>
            v == null ? v : postcodeFormattedAddressResponse.parse(v),
          )
        : (raw['addresses_formatted'] as any),
    };
  },
  ['addresses', 'addresses_formatted'],
);

/**
 * Cast schema for mapping the PostcodeResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const postcodeResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      addresses: raw['addresses'],
      addresses_formatted: Array.isArray(raw['addresses_formatted'])
        ? (raw['addresses_formatted'] as any[]).map((v: any) =>
            v == null ? v : postcodeFormattedAddressRequest.parse(v),
          )
        : (raw['addresses_formatted'] as any),
    };
  },
  ['addresses', 'addresses_formatted'],
);
