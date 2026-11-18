import * as core from '../../../../core';
import {
  VideoSelfieCheckApiValidationsFaceMatchStatus,
  videoSelfieCheckApiValidationsFaceMatchStatus,
} from './VideoSelfieCheckApiValidationsFaceMatchStatus';

/**
 * Whether the face matches previously submitted evidence.
Only present in v2 verifications.
 */
export interface VideoSelfieCheckApiValidationsFaceMatch {
  status: VideoSelfieCheckApiValidationsFaceMatchStatus;
}

export namespace VideoSelfieCheckApiValidationsFaceMatch {
  export type Status = VideoSelfieCheckApiValidationsFaceMatchStatus;
  export const Status = VideoSelfieCheckApiValidationsFaceMatchStatus;
}

/**
 * Cast schema for the VideoSelfieCheckApiValidationsFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const videoSelfieCheckApiValidationsFaceMatch =
  core.cast.identity<VideoSelfieCheckApiValidationsFaceMatch>();

/**
 * Cast schema for mapping API responses to the VideoSelfieCheckApiValidationsFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsFaceMatchResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['status']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, status: raw['status'] };
  },
  ['status'],
);

/**
 * Cast schema for mapping the VideoSelfieCheckApiValidationsFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { status: raw['status'] };
  },
  ['status'],
);
