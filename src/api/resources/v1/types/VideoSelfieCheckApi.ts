import * as core from '../../../../core';
import { VideoSelfieCheckApiStep, videoSelfieCheckApiStep } from './VideoSelfieCheckApiStep';
import { StepStatusApi, stepStatusApi } from './StepStatusApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  VideoSelfieCheckApiValidations,
  videoSelfieCheckApiValidations,
  videoSelfieCheckApiValidationsRequest,
  videoSelfieCheckApiValidationsResponse,
} from './VideoSelfieCheckApiValidations';
import { VideoSelfieCheckApiValidationsFaceMatch } from './VideoSelfieCheckApiValidationsFaceMatch';
import { VideoSelfieCheckApiValidationsRefereeDissimilarityCheck } from './VideoSelfieCheckApiValidationsRefereeDissimilarityCheck';
import { VideoSelfieCheckApiValidationsLivenessCheck } from './VideoSelfieCheckApiValidationsLivenessCheck';
import { VideoSelfieCheckApiValidationsFaceMatchStatus } from './VideoSelfieCheckApiValidationsFaceMatchStatus';
import { VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus } from './VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus';
import { VideoSelfieCheckApiValidationsLivenessCheckStatus } from './VideoSelfieCheckApiValidationsLivenessCheckStatus';

export interface VideoSelfieCheckApi {
  /** A video selfie submission (in progress or submitted). */
  step: VideoSelfieCheckApiStep;
  outcome: StepStatusApi;
  /** Total number of video selfie attempts. */
  total_attempts: number;
  /** Files captured or uploaded for this evidence item. */
  artefacts: ArtefactApi[];
  /** Validations performed on the video selfie and their results. */
  validations: VideoSelfieCheckApiValidations;
}

export namespace VideoSelfieCheckApi {
  export type Step = VideoSelfieCheckApiStep;
  export const Step = VideoSelfieCheckApiStep;
  export interface Validations {
    face_match?: VideoSelfieCheckApiValidations['face_match'];
    referee_dissimilarity_check?: VideoSelfieCheckApiValidations['referee_dissimilarity_check'];
    liveness_check?: VideoSelfieCheckApiValidations['liveness_check'];
  }
  export namespace Validations {
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
}

/**
 * Cast schema for the VideoSelfieCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const videoSelfieCheckApi = core.cast.identity<VideoSelfieCheckApi>();

/**
 * Cast schema for mapping API responses to the VideoSelfieCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'outcome',
      'total_attempts',
      'artefacts',
      'validations',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      step: raw['step'],
      outcome: raw['outcome'],
      total_attempts: raw['total_attempts'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) =>
            v == null ? v : artefactApiResponse.parse(v),
          )
        : (raw['artefacts'] as any),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : videoSelfieCheckApiValidationsResponse.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'total_attempts', 'artefacts', 'validations'],
);

/**
 * Cast schema for mapping the VideoSelfieCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const videoSelfieCheckApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      total_attempts: raw['total_attempts'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) => (v == null ? v : artefactApiRequest.parse(v)))
        : (raw['artefacts'] as any),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : videoSelfieCheckApiValidationsRequest.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'total_attempts', 'artefacts', 'validations'],
);
