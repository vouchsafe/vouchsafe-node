import * as core from '../../../../core';
import { StepIdentityVouchApiStep, stepIdentityVouchApiStep } from './StepIdentityVouchApiStep';
import {
  StepIdentityVouchApiOutcome,
  stepIdentityVouchApiOutcome,
} from './StepIdentityVouchApiOutcome';
import {
  StepIdentityVouchApiMethod,
  stepIdentityVouchApiMethod,
} from './StepIdentityVouchApiMethod';
import { VouchEvidenceApi, vouchEvidenceApi } from './VouchEvidenceApi';
import {
  VouchDetailsApi,
  vouchDetailsApi,
  vouchDetailsApiRequest,
  vouchDetailsApiResponse,
} from './VouchDetailsApi';
import {
  VouchValidationsApi,
  vouchValidationsApi,
  vouchValidationsApiRequest,
  vouchValidationsApiResponse,
} from './VouchValidationsApi';

export interface StepIdentityVouchApi {
  /** Proof of identity. */
  step: StepIdentityVouchApiStep;
  /** When the user provided this evidence, in ISO 8601 format. */
  created_at: string;
  /** Overall outcome of the evidence submission. */
  outcome: StepIdentityVouchApiOutcome;
  /** How the user proved their identity. */
  method: StepIdentityVouchApiMethod;
  evidence_type: VouchEvidenceApi;
  extracted_details: VouchDetailsApi;
  validations: VouchValidationsApi;
}

export namespace StepIdentityVouchApi {
  export type Step = StepIdentityVouchApiStep;
  export const Step = StepIdentityVouchApiStep;
  export type Outcome = StepIdentityVouchApiOutcome;
  export const Outcome = StepIdentityVouchApiOutcome;
  export type Method = StepIdentityVouchApiMethod;
  export const Method = StepIdentityVouchApiMethod;
}

/**
 * Cast schema for the StepIdentityVouchApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepIdentityVouchApi = core.cast.identity<StepIdentityVouchApi>();

/**
 * Cast schema for mapping API responses to the StepIdentityVouchApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepIdentityVouchApiResponse = core.cast.object(
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : vouchDetailsApiResponse.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : vouchValidationsApiResponse.parse(raw['validations']),
    };
  },
  ['step', 'created_at', 'outcome', 'method', 'evidence_type', 'extracted_details', 'validations'],
);

/**
 * Cast schema for mapping the StepIdentityVouchApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepIdentityVouchApiRequest = core.cast.object(
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : vouchDetailsApiRequest.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : vouchValidationsApiRequest.parse(raw['validations']),
    };
  },
  ['step', 'created_at', 'outcome', 'method', 'evidence_type', 'extracted_details', 'validations'],
);
