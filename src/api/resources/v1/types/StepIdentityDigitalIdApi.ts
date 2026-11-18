import * as core from '../../../../core';
import {
  StepIdentityDigitalIdApiStep,
  stepIdentityDigitalIdApiStep,
} from './StepIdentityDigitalIdApiStep';
import {
  StepIdentityDigitalIdApiOutcome,
  stepIdentityDigitalIdApiOutcome,
} from './StepIdentityDigitalIdApiOutcome';
import {
  StepIdentityDigitalIdApiMethod,
  stepIdentityDigitalIdApiMethod,
} from './StepIdentityDigitalIdApiMethod';
import {
  DigitalIdVerificationMethodApi,
  digitalIdVerificationMethodApi,
} from './DigitalIdVerificationMethodApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  DigitalIdExtractedDetailsApi,
  digitalIdExtractedDetailsApi,
  digitalIdExtractedDetailsApiRequest,
  digitalIdExtractedDetailsApiResponse,
} from './DigitalIdExtractedDetailsApi';
import {
  DigitalIdValidationsApi,
  digitalIdValidationsApi,
  digitalIdValidationsApiRequest,
  digitalIdValidationsApiResponse,
} from './DigitalIdValidationsApi';

export interface StepIdentityDigitalIdApi {
  /** Proof of identity. */
  step: StepIdentityDigitalIdApiStep;
  /** When the user provided this evidence, in ISO 8601 format. */
  created_at: string;
  /** Overall outcome of the evidence submission. */
  outcome: StepIdentityDigitalIdApiOutcome;
  /** How the user proved their identity. */
  method: StepIdentityDigitalIdApiMethod;
  evidence_type: DigitalIdVerificationMethodApi;
  /** The files collected, such as document images. Download each one using its `key`. */
  artefacts: ArtefactApi[];
  extracted_details: DigitalIdExtractedDetailsApi;
  validations: DigitalIdValidationsApi;
}

export namespace StepIdentityDigitalIdApi {
  export type Step = StepIdentityDigitalIdApiStep;
  export const Step = StepIdentityDigitalIdApiStep;
  export type Outcome = StepIdentityDigitalIdApiOutcome;
  export const Outcome = StepIdentityDigitalIdApiOutcome;
  export type Method = StepIdentityDigitalIdApiMethod;
  export const Method = StepIdentityDigitalIdApiMethod;
}

/**
 * Cast schema for the StepIdentityDigitalIdApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepIdentityDigitalIdApi = core.cast.identity<StepIdentityDigitalIdApi>();

/**
 * Cast schema for mapping API responses to the StepIdentityDigitalIdApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepIdentityDigitalIdApiResponse = core.cast.object(
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : digitalIdExtractedDetailsApiResponse.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : digitalIdValidationsApiResponse.parse(raw['validations']),
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
 * Cast schema for mapping the StepIdentityDigitalIdApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepIdentityDigitalIdApiRequest = core.cast.object(
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : digitalIdExtractedDetailsApiRequest.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : digitalIdValidationsApiRequest.parse(raw['validations']),
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
