import * as core from '../../../../core';
import {
  VideoSelfieCheckApiValidationsFaceMatch,
  videoSelfieCheckApiValidationsFaceMatch,
  videoSelfieCheckApiValidationsFaceMatchRequest,
  videoSelfieCheckApiValidationsFaceMatchResponse,
} from './VideoSelfieCheckApiValidationsFaceMatch';
import {
  VideoSelfieCheckApiValidationsRefereeDissimilarityCheck,
  videoSelfieCheckApiValidationsRefereeDissimilarityCheck,
  videoSelfieCheckApiValidationsRefereeDissimilarityCheckRequest,
  videoSelfieCheckApiValidationsRefereeDissimilarityCheckResponse,
} from './VideoSelfieCheckApiValidationsRefereeDissimilarityCheck';
import {
  VideoSelfieCheckApiValidationsLivenessCheck,
  videoSelfieCheckApiValidationsLivenessCheck,
  videoSelfieCheckApiValidationsLivenessCheckRequest,
  videoSelfieCheckApiValidationsLivenessCheckResponse,
} from './VideoSelfieCheckApiValidationsLivenessCheck';
import { VideoSelfieCheckApiValidationsFaceMatchStatus } from './VideoSelfieCheckApiValidationsFaceMatchStatus';
import { VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus } from './VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus';
import { VideoSelfieCheckApiValidationsLivenessCheckStatus } from './VideoSelfieCheckApiValidationsLivenessCheckStatus';

/**
 * Validations performed on the video selfie and their results.
 */
export interface VideoSelfieCheckApiValidations {
  /** Whether the face matches previously submitted evidence.
Only present in v2 verifications. */
  face_match?: VideoSelfieCheckApiValidationsFaceMatch;
  referee_dissimilarity_check?: VideoSelfieCheckApiValidationsRefereeDissimilarityCheck;
  liveness_check?: VideoSelfieCheckApiValidationsLivenessCheck;
}

export namespace VideoSelfieCheckApiValidations {
  export interface FaceMatch {
    status: VideoSelfieCheckApiValidationsFaceMatch['status'];
  }
  export namespace FaceMatch {
    export type Status = VideoSelfieCheckApiValidationsFaceMatchStatus;
    export const Status = VideoSelfieCheckApiValidationsFaceMatchStatus;
  }
  export interface RefereeDissimilarityCheck {
    score: VideoSelfieCheckApiValidationsRefereeDissimilarityCheck['score'];
    status: VideoSelfieCheckApiValidationsRefereeDissimilarityCheck['status'];
  }
  export namespace RefereeDissimilarityCheck {
    export type Status = VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus;
    export const Status = VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus;
  }
  export interface LivenessCheck {
    score: VideoSelfieCheckApiValidationsLivenessCheck['score'];
    status: VideoSelfieCheckApiValidationsLivenessCheck['status'];
  }
  export namespace LivenessCheck {
    export type Status = VideoSelfieCheckApiValidationsLivenessCheckStatus;
    export const Status = VideoSelfieCheckApiValidationsLivenessCheckStatus;
  }
}

/**
 * Cast schema for the VideoSelfieCheckApiValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const videoSelfieCheckApiValidations = core.cast.identity<VideoSelfieCheckApiValidations>();

/**
 * Cast schema for mapping API responses to the VideoSelfieCheckApiValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'face_match',
    'referee_dissimilarity_check',
    'liveness_check',
  ]);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    face_match:
      raw['face_match'] == null
        ? raw['face_match']
        : videoSelfieCheckApiValidationsFaceMatchResponse.parse(raw['face_match']),
    referee_dissimilarity_check:
      raw['referee_dissimilarity_check'] == null
        ? raw['referee_dissimilarity_check']
        : videoSelfieCheckApiValidationsRefereeDissimilarityCheckResponse.parse(
            raw['referee_dissimilarity_check'],
          ),
    liveness_check:
      raw['liveness_check'] == null
        ? raw['liveness_check']
        : videoSelfieCheckApiValidationsLivenessCheckResponse.parse(raw['liveness_check']),
  };
}, []);

/**
 * Cast schema for mapping the VideoSelfieCheckApiValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiValidationsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    face_match:
      raw['face_match'] == null
        ? raw['face_match']
        : videoSelfieCheckApiValidationsFaceMatchRequest.parse(raw['face_match']),
    referee_dissimilarity_check:
      raw['referee_dissimilarity_check'] == null
        ? raw['referee_dissimilarity_check']
        : videoSelfieCheckApiValidationsRefereeDissimilarityCheckRequest.parse(
            raw['referee_dissimilarity_check'],
          ),
    liveness_check:
      raw['liveness_check'] == null
        ? raw['liveness_check']
        : videoSelfieCheckApiValidationsLivenessCheckRequest.parse(raw['liveness_check']),
  };
}, []);
