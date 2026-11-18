import * as core from '../../../../core';
import {
  StepIdentityPhotoIdApiStep,
  stepIdentityPhotoIdApiStep,
} from './StepIdentityPhotoIdApiStep';
import {
  StepIdentityPhotoIdApiOutcome,
  stepIdentityPhotoIdApiOutcome,
} from './StepIdentityPhotoIdApiOutcome';
import {
  StepIdentityPhotoIdApiMethod,
  stepIdentityPhotoIdApiMethod,
} from './StepIdentityPhotoIdApiMethod';
import { PhotoIdEvidenceApi, photoIdEvidenceApi } from './PhotoIdEvidenceApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  PhotoIdExtractedDetailsApi,
  photoIdExtractedDetailsApi,
  photoIdExtractedDetailsApiRequest,
  photoIdExtractedDetailsApiResponse,
} from './PhotoIdExtractedDetailsApi';
import {
  StepIdentityPhotoIdApiValidations,
  stepIdentityPhotoIdApiValidations,
  stepIdentityPhotoIdApiValidationsRequest,
  stepIdentityPhotoIdApiValidationsResponse,
} from './StepIdentityPhotoIdApiValidations';

export interface StepIdentityPhotoIdApi {
  /** Proof of identity. */
  step: StepIdentityPhotoIdApiStep;
  /** When the user provided this evidence, in ISO 8601 format. */
  created_at: string;
  /** Overall outcome of the evidence submission. */
  outcome: StepIdentityPhotoIdApiOutcome;
  /** How the user proved their identity. */
  method: StepIdentityPhotoIdApiMethod;
  evidence_type: PhotoIdEvidenceApi;
  /** The files collected, such as document images. Download each one using its `key`. */
  artefacts: ArtefactApi[];
  extracted_details: PhotoIdExtractedDetailsApi;
  /** Each check run on the document, and whether it passed. Empty while `outcome` is `in_progress`. */
  validations: StepIdentityPhotoIdApiValidations;
}

export namespace StepIdentityPhotoIdApi {
  export type Step = StepIdentityPhotoIdApiStep;
  export const Step = StepIdentityPhotoIdApiStep;
  export type Outcome = StepIdentityPhotoIdApiOutcome;
  export const Outcome = StepIdentityPhotoIdApiOutcome;
  export type Method = StepIdentityPhotoIdApiMethod;
  export const Method = StepIdentityPhotoIdApiMethod;
  export type Validations = StepIdentityPhotoIdApiValidations;
}

/**
 * Cast schema for the StepIdentityPhotoIdApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepIdentityPhotoIdApi = core.cast.identity<StepIdentityPhotoIdApi>();

/**
 * Cast schema for mapping API responses to the StepIdentityPhotoIdApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepIdentityPhotoIdApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'created_at',
      'outcome',
      'method',
      'evidence_type',
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
      created_at: raw['created_at'],
      outcome: raw['outcome'],
      method: raw['method'],
      evidence_type: raw['evidence_type'],
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
    'created_at',
    'outcome',
    'method',
    'evidence_type',
    'artefacts',
    'extracted_details',
    'validations',
  ],
);

/**
 * Cast schema for mapping the StepIdentityPhotoIdApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepIdentityPhotoIdApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      created_at: raw['created_at'],
      outcome: raw['outcome'],
      method: raw['method'],
      evidence_type: raw['evidence_type'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) => (v == null ? v : artefactApiRequest.parse(v)))
        : (raw['artefacts'] as any),
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'step',
    'created_at',
    'outcome',
    'method',
    'evidence_type',
    'artefacts',
    'extracted_details',
    'validations',
  ],
);
