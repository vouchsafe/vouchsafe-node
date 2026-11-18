import * as core from '../../../../core';
import { AmlMatchApi, amlMatchApi, amlMatchApiRequest, amlMatchApiResponse } from './AmlMatchApi';

export interface AmlCheckApiDetails {
  /** Sanctions list matches found. Empty when the check passed. */
  matches: AmlMatchApi[];
  /** The score threshold above which a match is considered a hit. */
  threshold: number | null;
}

/**
 * Cast schema for the AmlCheckApiDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlCheckApiDetails = core.cast.identity<AmlCheckApiDetails>();

/**
 * Cast schema for mapping API responses to the AmlCheckApiDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlCheckApiDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['matches', 'threshold']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      matches: Array.isArray(raw['matches'])
        ? (raw['matches'] as any[]).map((v: any) => (v == null ? v : amlMatchApiResponse.parse(v)))
        : (raw['matches'] as any),
      threshold: raw['threshold'],
    };
  },
  ['matches', 'threshold'],
);

/**
 * Cast schema for mapping the AmlCheckApiDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlCheckApiDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      matches: Array.isArray(raw['matches'])
        ? (raw['matches'] as any[]).map((v: any) => (v == null ? v : amlMatchApiRequest.parse(v)))
        : (raw['matches'] as any),
      threshold: raw['threshold'],
    };
  },
  ['matches', 'threshold'],
);
