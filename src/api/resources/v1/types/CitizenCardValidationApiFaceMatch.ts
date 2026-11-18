import * as core from '../../../../core';
import {
  CitizenCardValidationApiFaceMatchStatus,
  citizenCardValidationApiFaceMatchStatus,
} from './CitizenCardValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface CitizenCardValidationApiFaceMatch {
  score: number | null;
  status: CitizenCardValidationApiFaceMatchStatus;
}

export namespace CitizenCardValidationApiFaceMatch {
  export type Status = CitizenCardValidationApiFaceMatchStatus;
  export const Status = CitizenCardValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the CitizenCardValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const citizenCardValidationApiFaceMatch =
  core.cast.identity<CitizenCardValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the CitizenCardValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const citizenCardValidationApiFaceMatchResponse = core.cast.object(
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
 * Cast schema for mapping the CitizenCardValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const citizenCardValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
