import * as core from '../../../../core';
import {
  RightToRentVerificationResponseVerificationMethod,
  rightToRentVerificationResponseVerificationMethod,
} from './RightToRentVerificationResponseVerificationMethod';
import {
  RightToRentVerificationResponseEvidenceType,
  rightToRentVerificationResponseEvidenceType,
} from './RightToRentVerificationResponseEvidenceType';
import { ApiValidationStatus, apiValidationStatus } from './ApiValidationStatus';
import {
  RightToRentVerificationResponseExtractedDetails,
  rightToRentVerificationResponseExtractedDetails,
  rightToRentVerificationResponseExtractedDetailsRequest,
  rightToRentVerificationResponseExtractedDetailsResponse,
} from './RightToRentVerificationResponseExtractedDetails';
import {
  EvisaArtefact,
  evisaArtefact,
  evisaArtefactRequest,
  evisaArtefactResponse,
} from './EvisaArtefact';
import {
  RightToRentVerificationResponseValidations,
  rightToRentVerificationResponseValidations,
  rightToRentVerificationResponseValidationsRequest,
  rightToRentVerificationResponseValidationsResponse,
} from './RightToRentVerificationResponseValidations';

export interface RightToRentVerificationResponse {
  verification_method: RightToRentVerificationResponseVerificationMethod;
  evidence_type: 'right_to_rent';
  outcome: ApiValidationStatus;
  /** Whether this API call is billable. `true` when the eVisa was found on GOV.UK, `false` when the share code or date of birth was invalid. */
  billable: boolean;
  extracted_details: RightToRentVerificationResponseExtractedDetails;
  artefacts: EvisaArtefact[];
  validations: RightToRentVerificationResponseValidations;
}

export namespace RightToRentVerificationResponse {
  export type VerificationMethod = RightToRentVerificationResponseVerificationMethod;
  export const VerificationMethod = RightToRentVerificationResponseVerificationMethod;
  export type EvidenceType = RightToRentVerificationResponseEvidenceType;
  export const EvidenceType = RightToRentVerificationResponseEvidenceType;
  export type ExtractedDetails = RightToRentVerificationResponseExtractedDetails;
  export type Validations = RightToRentVerificationResponseValidations;
}

/**
 * Cast schema for the RightToRentVerificationResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToRentVerificationResponse =
  core.cast.identity<RightToRentVerificationResponse>();

/**
 * Cast schema for mapping API responses to the RightToRentVerificationResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToRentVerificationResponseResponse = core.cast.object(
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
 * Cast schema for mapping the RightToRentVerificationResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToRentVerificationResponseRequest = core.cast.object(
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
