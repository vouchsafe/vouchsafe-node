import * as core from '../../../../core';
import { CoverageType, coverageType } from './CoverageType';

export interface CoverageItem {
  /** Machine-readable identifier for this item, which can be passed to other endpoints as a `sub_type` where supported. */
  id: string | null;
  /** Display name, e.g. "Passport", "ConnectID" */
  name: string;
  type: CoverageType;
  /** Two-letter country codes this item is supported in, or an empty array if it's supported globally */
  country_codes: string[];
  /** Provider logo/icon URL, or null if none exists */
  image: string | null;
}

/**
 * Cast schema for the CoverageItem model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const coverageItem = core.cast.identity<CoverageItem>();

/**
 * Cast schema for mapping API responses to the CoverageItem application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const coverageItemResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['id', 'name', 'type', 'country_codes', 'image']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      id: raw['id'],
      name: raw['name'],
      type: raw['type'],
      country_codes: raw['country_codes'],
      image: raw['image'],
    };
  },
  ['id', 'name', 'type', 'country_codes', 'image'],
);

/**
 * Cast schema for mapping the CoverageItem application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const coverageItemRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      name: raw['name'],
      type: raw['type'],
      country_codes: raw['country_codes'],
      image: raw['image'],
    };
  },
  ['id', 'name', 'type', 'country_codes', 'image'],
);
