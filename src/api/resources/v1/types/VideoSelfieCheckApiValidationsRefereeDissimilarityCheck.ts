import * as core from '../../../../core';
import {
  VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus,
  videoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus,
} from './VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus';

export interface VideoSelfieCheckApiValidationsRefereeDissimilarityCheck {
  /** Dissimilarity score, or null if unavailable. */
  score: number | null;
  /** Whether the dissimilarity check passed or failed. */
  status: VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus;
}

export namespace VideoSelfieCheckApiValidationsRefereeDissimilarityCheck {
  export type Status = VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus;
  export const Status = VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus;
}

/**
 * Cast schema for the VideoSelfieCheckApiValidationsRefereeDissimilarityCheck model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const videoSelfieCheckApiValidationsRefereeDissimilarityCheck =
  core.cast.identity<VideoSelfieCheckApiValidationsRefereeDissimilarityCheck>();

/**
 * Cast schema for mapping API responses to the VideoSelfieCheckApiValidationsRefereeDissimilarityCheck application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsRefereeDissimilarityCheckResponse = core.cast.object(
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
 * Cast schema for mapping the VideoSelfieCheckApiValidationsRefereeDissimilarityCheck application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsRefereeDissimilarityCheckRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
