import * as core from '../../../../core';
import {
  SupportingDocumentEvidenceItemApiStep,
  supportingDocumentEvidenceItemApiStep,
} from './SupportingDocumentEvidenceItemApiStep';
import {
  SupportingDocumentEvidenceItemApiOutcome,
  supportingDocumentEvidenceItemApiOutcome,
} from './SupportingDocumentEvidenceItemApiOutcome';
import {
  SupportingDocumentEvidenceApi,
  supportingDocumentEvidenceApi,
} from './SupportingDocumentEvidenceApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  SupportingDocumentDetailsApi,
  supportingDocumentDetailsApi,
  supportingDocumentDetailsApiRequest,
  supportingDocumentDetailsApiResponse,
} from './SupportingDocumentDetailsApi';
import {
  SupportingDocumentValidationsApi,
  supportingDocumentValidationsApi,
  supportingDocumentValidationsApiRequest,
  supportingDocumentValidationsApiResponse,
} from './SupportingDocumentValidationsApi';

export interface SupportingDocumentEvidenceItemApi {
  /** A submitted supporting document evidence.
Note: If the verification flow requires multiple documents,
each submission is returned as its own evidence item in the checks array. */
  step: SupportingDocumentEvidenceItemApiStep;
  /** The overall outcome of the document submission. */
  outcome: SupportingDocumentEvidenceItemApiOutcome;
  evidence_type: SupportingDocumentEvidenceApi;
  /** ISO 8601 timestamp for when this evidence attempt was started. */
  created_at: string;
  /** Files captured or uploaded for this evidence item. */
  artefacts: ArtefactApi[];
  extracted_details: SupportingDocumentDetailsApi;
  validations: SupportingDocumentValidationsApi;
}

export namespace SupportingDocumentEvidenceItemApi {
  export type Step = SupportingDocumentEvidenceItemApiStep;
  export const Step = SupportingDocumentEvidenceItemApiStep;
  export type Outcome = SupportingDocumentEvidenceItemApiOutcome;
  export const Outcome = SupportingDocumentEvidenceItemApiOutcome;
}

/**
 * Cast schema for the SupportingDocumentEvidenceItemApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentEvidenceItemApi =
  core.cast.identity<SupportingDocumentEvidenceItemApi>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentEvidenceItemApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentEvidenceItemApiResponse = core.cast.object(
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : supportingDocumentDetailsApiResponse.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : supportingDocumentValidationsApiResponse.parse(raw['validations']),
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
 * Cast schema for mapping the SupportingDocumentEvidenceItemApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentEvidenceItemApiRequest = core.cast.object(
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : supportingDocumentDetailsApiRequest.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : supportingDocumentValidationsApiRequest.parse(raw['validations']),
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
