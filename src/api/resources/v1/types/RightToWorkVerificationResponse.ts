import * as core from '../../../../core';
import {
  RightToWorkVerificationResponseVerificationMethod,
  rightToWorkVerificationResponseVerificationMethod,
} from './RightToWorkVerificationResponseVerificationMethod';
import {
  RightToWorkVerificationResponseEvidenceType,
  rightToWorkVerificationResponseEvidenceType,
} from './RightToWorkVerificationResponseEvidenceType';
import { ApiValidationStatus, apiValidationStatus } from './ApiValidationStatus';
import {
  RightToWorkVerificationResponseExtractedDetails,
  rightToWorkVerificationResponseExtractedDetails,
  rightToWorkVerificationResponseExtractedDetailsRequest,
  rightToWorkVerificationResponseExtractedDetailsResponse,
} from './RightToWorkVerificationResponseExtractedDetails';
import {
  EvisaArtefact,
  evisaArtefact,
  evisaArtefactRequest,
  evisaArtefactResponse,
} from './EvisaArtefact';
import {
  RightToWorkVerificationResponseValidations,
  rightToWorkVerificationResponseValidations,
  rightToWorkVerificationResponseValidationsRequest,
  rightToWorkVerificationResponseValidationsResponse,
} from './RightToWorkVerificationResponseValidations';

export interface RightToWorkVerificationResponse {
  verification_method: RightToWorkVerificationResponseVerificationMethod;
  evidence_type: 'right_to_work';
  outcome: ApiValidationStatus;
  /** Whether this API call is billable. `true` when the eVisa was found on GOV.UK, `false` when the share code or date of birth was invalid. */
  billable: boolean;
  extracted_details: RightToWorkVerificationResponseExtractedDetails;
  artefacts: EvisaArtefact[];
  validations: RightToWorkVerificationResponseValidations;
}

export namespace RightToWorkVerificationResponse {
  export type VerificationMethod = RightToWorkVerificationResponseVerificationMethod;
  export const VerificationMethod = RightToWorkVerificationResponseVerificationMethod;
  export type EvidenceType = RightToWorkVerificationResponseEvidenceType;
  export const EvidenceType = RightToWorkVerificationResponseEvidenceType;
  export type ExtractedDetails = RightToWorkVerificationResponseExtractedDetails;
  export type Validations = RightToWorkVerificationResponseValidations;
}

/**
 * Cast schema for the RightToWorkVerificationResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToWorkVerificationResponse =
  core.cast.identity<RightToWorkVerificationResponse>();

/**
 * Cast schema for mapping API responses to the RightToWorkVerificationResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToWorkVerificationResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'verification_method',
      'evidence_type',
      'outcome',
      'billable',
      'extracted_details',
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
      verification_method: raw['verification_method'],
      evidence_type: raw['evidence_type'],
      outcome: raw['outcome'],
      billable: raw['billable'],
      extracted_details: raw['extracted_details'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) =>
            v == null ? v : evisaArtefactResponse.parse(v),
          )
        : (raw['artefacts'] as any),
      validations: raw['validations'],
    };
  },
  [
    'verification_method',
    'evidence_type',
    'outcome',
    'billable',
    'extracted_details',
    'artefacts',
    'validations',
  ],
);

/**
 * Cast schema for mapping the RightToWorkVerificationResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToWorkVerificationResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      verification_method: raw['verification_method'],
      evidence_type: raw['evidence_type'],
      outcome: raw['outcome'],
      billable: raw['billable'],
      extracted_details: raw['extracted_details'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) =>
            v == null ? v : evisaArtefactRequest.parse(v),
          )
        : (raw['artefacts'] as any),
      validations: raw['validations'],
    };
  },
  [
    'verification_method',
    'evidence_type',
    'outcome',
    'billable',
    'extracted_details',
    'artefacts',
    'validations',
  ],
);
