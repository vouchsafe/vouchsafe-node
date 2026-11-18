import * as core from '../../../../core';
import {
  VideoSelfieCheckApiValidationsLivenessCheckStatus,
  videoSelfieCheckApiValidationsLivenessCheckStatus,
} from './VideoSelfieCheckApiValidationsLivenessCheckStatus';

export interface VideoSelfieCheckApiValidationsLivenessCheck {
  /** Liveness score, or null if unavailable. */
  score: number | null;
  /** Whether the liveness check passed or failed. */
  status: VideoSelfieCheckApiValidationsLivenessCheckStatus;
}

export namespace VideoSelfieCheckApiValidationsLivenessCheck {
  export type Status = VideoSelfieCheckApiValidationsLivenessCheckStatus;
  export const Status = VideoSelfieCheckApiValidationsLivenessCheckStatus;
}

/**
 * Cast schema for the VideoSelfieCheckApiValidationsLivenessCheck model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const videoSelfieCheckApiValidationsLivenessCheck =
  core.cast.identity<VideoSelfieCheckApiValidationsLivenessCheck>();

/**
 * Cast schema for mapping API responses to the VideoSelfieCheckApiValidationsLivenessCheck application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsLivenessCheckResponse = core.cast.object(
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
 * Cast schema for mapping the VideoSelfieCheckApiValidationsLivenessCheck application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsLivenessCheckRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
