import * as core from '../../../../core';
import {
  PhotoIdEvidenceItemApiStep,
  photoIdEvidenceItemApiStep,
} from './PhotoIdEvidenceItemApiStep';
import {
  PhotoIdEvidenceItemApiOutcome,
  photoIdEvidenceItemApiOutcome,
} from './PhotoIdEvidenceItemApiOutcome';
import { PhotoIdEvidenceApi, photoIdEvidenceApi } from './PhotoIdEvidenceApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  PhotoIdExtractedDetailsApi,
  photoIdExtractedDetailsApi,
  photoIdExtractedDetailsApiRequest,
  photoIdExtractedDetailsApiResponse,
} from './PhotoIdExtractedDetailsApi';
import {
  PhotoIdValidationsApi,
  photoIdValidationsApi,
  photoIdValidationsApiRequest,
  photoIdValidationsApiResponse,
} from './PhotoIdValidationsApi';

export interface PhotoIdEvidenceItemApi {
  /** A submitted Photo ID evidence. */
  step: PhotoIdEvidenceItemApiStep;
  /** The overall outcome of the document submission. */
  outcome: PhotoIdEvidenceItemApiOutcome;
  evidence_type: PhotoIdEvidenceApi;
  /** ISO 8601 timestamp for when this evidence attempt was started. */
  created_at: string;
  /** Files captured or uploaded for this evidence item. */
  artefacts: ArtefactApi[];
  extracted_details: PhotoIdExtractedDetailsApi;
  validations: PhotoIdValidationsApi;
}

export namespace PhotoIdEvidenceItemApi {
  export type Step = PhotoIdEvidenceItemApiStep;
  export const Step = PhotoIdEvidenceItemApiStep;
  export type Outcome = PhotoIdEvidenceItemApiOutcome;
  export const Outcome = PhotoIdEvidenceItemApiOutcome;
}

/**
 * Cast schema for the PhotoIdEvidenceItemApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const photoIdEvidenceItemApi = core.cast.identity<PhotoIdEvidenceItemApi>();

/**
 * Cast schema for mapping API responses to the PhotoIdEvidenceItemApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const photoIdEvidenceItemApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'outcome',
      'evidence_type',
      'created_at',
      'artefacts',
      'extracted_details',
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
      evidence_type: raw['evidence_type'],
      created_at: raw['created_at'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) =>
            v == null ? v : artefactApiResponse.parse(v),
          )
        : (raw['artefacts'] as any),
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'step',
    'outcome',
    'evidence_type',
    'created_at',
    'artefacts',
    'extracted_details',
    'validations',
  ],
);

/**
 * Cast schema for mapping the PhotoIdEvidenceItemApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const photoIdEvidenceItemApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      evidence_type: raw['evidence_type'],
      created_at: raw['created_at'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) => (v == null ? v : artefactApiRequest.parse(v)))
        : (raw['artefacts'] as any),
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'step',
    'outcome',
    'evidence_type',
    'created_at',
    'artefacts',
    'extracted_details',
    'validations',
  ],
);
