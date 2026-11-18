import * as core from '../../../../core';
import {
  IdCardValidationApiFaceMatchStatus,
  idCardValidationApiFaceMatchStatus,
} from './IdCardValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface IdCardValidationApiFaceMatch {
  score: number | null;
  status: IdCardValidationApiFaceMatchStatus;
}

export namespace IdCardValidationApiFaceMatch {
  export type Status = IdCardValidationApiFaceMatchStatus;
  export const Status = IdCardValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the IdCardValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const idCardValidationApiFaceMatch = core.cast.identity<IdCardValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the IdCardValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const idCardValidationApiFaceMatchResponse = core.cast.object(
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
 * Cast schema for mapping the IdCardValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const idCardValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
