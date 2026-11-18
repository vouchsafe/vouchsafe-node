import * as core from '../../../../core';
import {
  NationalIdValidationApiFaceMatchStatus,
  nationalIdValidationApiFaceMatchStatus,
} from './NationalIdValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface NationalIdValidationApiFaceMatch {
  score: number | null;
  status: NationalIdValidationApiFaceMatchStatus;
}

export namespace NationalIdValidationApiFaceMatch {
  export type Status = NationalIdValidationApiFaceMatchStatus;
  export const Status = NationalIdValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the NationalIdValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const nationalIdValidationApiFaceMatch =
  core.cast.identity<NationalIdValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the NationalIdValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const nationalIdValidationApiFaceMatchResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['score', 'status']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);

/**
 * Cast schema for mapping the NationalIdValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const nationalIdValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
