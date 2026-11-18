import * as core from '../../../../core';
import {
  ImmigrationStatusVerificationResponseVerificationMethod,
  immigrationStatusVerificationResponseVerificationMethod,
} from './ImmigrationStatusVerificationResponseVerificationMethod';
import {
  ImmigrationStatusVerificationResponseEvidenceType,
  immigrationStatusVerificationResponseEvidenceType,
} from './ImmigrationStatusVerificationResponseEvidenceType';
import {
  ImmigrationStatusApiValidationStatus,
  immigrationStatusApiValidationStatus,
} from './ImmigrationStatusApiValidationStatus';
import {
  ImmigrationStatusVerificationResponseExtractedDetails,
  immigrationStatusVerificationResponseExtractedDetails,
  immigrationStatusVerificationResponseExtractedDetailsRequest,
  immigrationStatusVerificationResponseExtractedDetailsResponse,
} from './ImmigrationStatusVerificationResponseExtractedDetails';
import {
  EvisaArtefact,
  evisaArtefact,
  evisaArtefactRequest,
  evisaArtefactResponse,
} from './EvisaArtefact';
import {
  ImmigrationStatusVerificationResponseValidations,
  immigrationStatusVerificationResponseValidations,
  immigrationStatusVerificationResponseValidationsRequest,
  immigrationStatusVerificationResponseValidationsResponse,
} from './ImmigrationStatusVerificationResponseValidations';

export interface ImmigrationStatusVerificationResponse {
  verification_method: ImmigrationStatusVerificationResponseVerificationMethod;
  evidence_type: 'immigration_status';
  outcome: ImmigrationStatusApiValidationStatus;
  /** Whether this API call is billable. `true` when the eVisa was found on GOV.UK, `false` when the share code or date of birth was invalid. */
  billable: boolean;
  extracted_details: ImmigrationStatusVerificationResponseExtractedDetails;
  artefacts: EvisaArtefact[];
  validations: ImmigrationStatusVerificationResponseValidations;
}

export namespace ImmigrationStatusVerificationResponse {
  export type VerificationMethod = ImmigrationStatusVerificationResponseVerificationMethod;
  export const VerificationMethod = ImmigrationStatusVerificationResponseVerificationMethod;
  export type EvidenceType = ImmigrationStatusVerificationResponseEvidenceType;
  export const EvidenceType = ImmigrationStatusVerificationResponseEvidenceType;
  export type ExtractedDetails = ImmigrationStatusVerificationResponseExtractedDetails;
  export type Validations = ImmigrationStatusVerificationResponseValidations;
}

/**
 * Cast schema for the ImmigrationStatusVerificationResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const immigrationStatusVerificationResponse =
  core.cast.identity<ImmigrationStatusVerificationResponse>();

/**
 * Cast schema for mapping API responses to the ImmigrationStatusVerificationResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const immigrationStatusVerificationResponseResponse = core.cast.object(
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
 * Cast schema for mapping the ImmigrationStatusVerificationResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const immigrationStatusVerificationResponseRequest = core.cast.object(
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
