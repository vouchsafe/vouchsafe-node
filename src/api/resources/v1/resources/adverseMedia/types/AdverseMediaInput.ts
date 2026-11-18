import * as core from '../../../../../../core';

export interface AdverseMediaInput {
  /** Given name */
  first_name: string;
  /** Middle name(s), space-separated. Including middle names improves search precision. */
  middle_names?: string;
  /** Family name */
  last_name: string;
  /** City, county, or country. Strongly recommended: including a location significantly improves
search precision and reduces false positives for common names. */
  location?: string;
  /** Adversity score threshold (0–100). Articles scoring at or above this value are
treated as strong matches and will cause the check to fail. Defaults to 70. */
  threshold?: number;
}

/**
 * Cast schema for the AdverseMediaInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const adverseMediaInput = core.cast.identity<AdverseMediaInput>();

/**
 * Cast schema for mapping API responses to the AdverseMediaInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const adverseMediaInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'middle_names',
      'last_name',
      'location',
      'threshold',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      first_name: raw['first_name'],
      middle_names: raw['middle_names'],
      last_name: raw['last_name'],
      location: raw['location'],
      threshold: raw['threshold'],
    };
  },
  ['first_name', 'last_name'],
);

/**
 * Cast schema for mapping the AdverseMediaInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const adverseMediaInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      middle_names: raw['middle_names'],
      last_name: raw['last_name'],
      location: raw['location'],
      threshold: raw['threshold'],
    };
  },
  ['first_name', 'last_name'],
);
