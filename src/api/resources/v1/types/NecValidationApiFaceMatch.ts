import * as core from '../../../../core';
import {
  NecValidationApiFaceMatchStatus,
  necValidationApiFaceMatchStatus,
} from './NecValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface NecValidationApiFaceMatch {
  score: number | null;
  status: NecValidationApiFaceMatchStatus;
}

export namespace NecValidationApiFaceMatch {
  export type Status = NecValidationApiFaceMatchStatus;
  export const Status = NecValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the NecValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const necValidationApiFaceMatch = core.cast.identity<NecValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the NecValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const necValidationApiFaceMatchResponse = core.cast.object(
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
 * Cast schema for mapping the NecValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const necValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
