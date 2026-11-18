import * as core from '../../../../core';
import {
  PassportValidationApiFaceMatchStatus,
  passportValidationApiFaceMatchStatus,
} from './PassportValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface PassportValidationApiFaceMatch {
  score: number | null;
  status: PassportValidationApiFaceMatchStatus;
}

export namespace PassportValidationApiFaceMatch {
  export type Status = PassportValidationApiFaceMatchStatus;
  export const Status = PassportValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the PassportValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const passportValidationApiFaceMatch = core.cast.identity<PassportValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the PassportValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const passportValidationApiFaceMatchResponse = core.cast.object(
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
 * Cast schema for mapping the PassportValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const passportValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
