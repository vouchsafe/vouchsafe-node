import * as core from '../../../../core';
import { EvisaEvidenceItemApiStep, evisaEvidenceItemApiStep } from './EvisaEvidenceItemApiStep';
import {
  EvisaEvidenceItemApiOutcome,
  evisaEvidenceItemApiOutcome,
} from './EvisaEvidenceItemApiOutcome';
import { EvisaEvidenceApi, evisaEvidenceApi } from './EvisaEvidenceApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  EvisaExtractedDetailsApi,
  evisaExtractedDetailsApi,
  evisaExtractedDetailsApiRequest,
  evisaExtractedDetailsApiResponse,
} from './EvisaExtractedDetailsApi';
import {
  EvisaValidationsApi,
  evisaValidationsApi,
  evisaValidationsApiRequest,
  evisaValidationsApiResponse,
} from './EvisaValidationsApi';

export interface EvisaEvidenceItemApi {
  /** A submitted eVisa evidence. */
  step: EvisaEvidenceItemApiStep;
  /** The overall outcome of the eVisa submission */
  outcome: EvisaEvidenceItemApiOutcome;
  evidence_type: EvisaEvidenceApi;
  /** ISO 8601 timestamp for when this evidence attempt was started. */
  created_at: string;
  /** Files captured or uploaded for this evidence item. */
  artefacts: ArtefactApi[];
  extracted_details: EvisaExtractedDetailsApi;
  validations: EvisaValidationsApi;
}

export namespace EvisaEvidenceItemApi {
  export type Step = EvisaEvidenceItemApiStep;
  export const Step = EvisaEvidenceItemApiStep;
  export type Outcome = EvisaEvidenceItemApiOutcome;
  export const Outcome = EvisaEvidenceItemApiOutcome;
}

/**
 * Cast schema for the EvisaEvidenceItemApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaEvidenceItemApi = core.cast.identity<EvisaEvidenceItemApi>();

/**
 * Cast schema for mapping API responses to the EvisaEvidenceItemApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaEvidenceItemApiResponse = core.cast.object(
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
      validations:
        raw['validations'] == null
          ? raw['validations']
          : evisaValidationsApiResponse.parse(raw['validations']),
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
 * Cast schema for mapping the EvisaEvidenceItemApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaEvidenceItemApiRequest = core.cast.object(
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
      validations:
        raw['validations'] == null
          ? raw['validations']
          : evisaValidationsApiRequest.parse(raw['validations']),
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
