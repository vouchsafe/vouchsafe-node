import * as core from '../../../../core';
import {
  EvisaValidationsApiFaceMatchStatus,
  evisaValidationsApiFaceMatchStatus,
} from './EvisaValidationsApiFaceMatchStatus';

/**
 * Whether the eVisa photo matches the video selfie (with score).
 */
export interface EvisaValidationsApiFaceMatch {
  score: number | null;
  status: EvisaValidationsApiFaceMatchStatus;
}

export namespace EvisaValidationsApiFaceMatch {
  export type Status = EvisaValidationsApiFaceMatchStatus;
  export const Status = EvisaValidationsApiFaceMatchStatus;
}

/**
 * Cast schema for the EvisaValidationsApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaValidationsApiFaceMatch = core.cast.identity<EvisaValidationsApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the EvisaValidationsApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaValidationsApiFaceMatchResponse = core.cast.object(
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
 * Cast schema for mapping the EvisaValidationsApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaValidationsApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
