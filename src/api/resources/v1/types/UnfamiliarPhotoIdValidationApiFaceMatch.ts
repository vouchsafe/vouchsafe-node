import * as core from '../../../../core';
import {
  UnfamiliarPhotoIdValidationApiFaceMatchStatus,
  unfamiliarPhotoIdValidationApiFaceMatchStatus,
} from './UnfamiliarPhotoIdValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface UnfamiliarPhotoIdValidationApiFaceMatch {
  score: number | null;
  status: UnfamiliarPhotoIdValidationApiFaceMatchStatus;
}

export namespace UnfamiliarPhotoIdValidationApiFaceMatch {
  export type Status = UnfamiliarPhotoIdValidationApiFaceMatchStatus;
  export const Status = UnfamiliarPhotoIdValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the UnfamiliarPhotoIdValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const unfamiliarPhotoIdValidationApiFaceMatch =
  core.cast.identity<UnfamiliarPhotoIdValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the UnfamiliarPhotoIdValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdValidationApiFaceMatchResponse = core.cast.object(
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
 * Cast schema for mapping the UnfamiliarPhotoIdValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
