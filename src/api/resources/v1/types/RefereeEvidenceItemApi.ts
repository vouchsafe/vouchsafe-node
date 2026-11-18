import * as core from '../../../../core';
import {
  RefereeEvidenceItemApiStep,
  refereeEvidenceItemApiStep,
} from './RefereeEvidenceItemApiStep';
import {
  RefereeEvidenceItemApiOutcome,
  refereeEvidenceItemApiOutcome,
} from './RefereeEvidenceItemApiOutcome';
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

export interface RefereeEvidenceItemApi {
  /** A submitted vouch evidence. */
  step: RefereeEvidenceItemApiStep;
  /** The overall outcome of the referee verification. */
  outcome: RefereeEvidenceItemApiOutcome;
  evidence_type: VouchEvidenceApi;
  /** ISO 8601 timestamp for when the vouch request was sent to the referee. */
  created_at: string;
  extracted_details: VouchDetailsApi;
  validations: VouchValidationsApi;
}

export namespace RefereeEvidenceItemApi {
  export type Step = RefereeEvidenceItemApiStep;
  export const Step = RefereeEvidenceItemApiStep;
  export type Outcome = RefereeEvidenceItemApiOutcome;
  export const Outcome = RefereeEvidenceItemApiOutcome;
}

/**
 * Cast schema for the RefereeEvidenceItemApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const refereeEvidenceItemApi = core.cast.identity<RefereeEvidenceItemApi>();

/**
 * Cast schema for mapping API responses to the RefereeEvidenceItemApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const refereeEvidenceItemApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'outcome',
      'evidence_type',
      'created_at',
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
  ['step', 'outcome', 'evidence_type', 'created_at', 'extracted_details', 'validations'],
);

/**
 * Cast schema for mapping the RefereeEvidenceItemApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const refereeEvidenceItemApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      evidence_type: raw['evidence_type'],
      created_at: raw['created_at'],
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
  ['step', 'outcome', 'evidence_type', 'created_at', 'extracted_details', 'validations'],
);
