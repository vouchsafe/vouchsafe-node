import * as core from '../../../../core';
import {
  SupportingDocumentVerificationResponseVerificationMethod,
  supportingDocumentVerificationResponseVerificationMethod,
} from './SupportingDocumentVerificationResponseVerificationMethod';
import {
  SupportingDocumentEvidenceType,
  supportingDocumentEvidenceType,
} from './SupportingDocumentEvidenceType';
import { ApiValidationStatus, apiValidationStatus } from './ApiValidationStatus';
import {
  SupportingDocumentVerificationResponseExtractedDetails,
  supportingDocumentVerificationResponseExtractedDetails,
  supportingDocumentVerificationResponseExtractedDetailsRequest,
  supportingDocumentVerificationResponseExtractedDetailsResponse,
} from './SupportingDocumentVerificationResponseExtractedDetails';
import {
  SupportingDocumentVerificationResponseValidations,
  supportingDocumentVerificationResponseValidations,
  supportingDocumentVerificationResponseValidationsRequest,
  supportingDocumentVerificationResponseValidationsResponse,
} from './SupportingDocumentVerificationResponseValidations';

export interface SupportingDocumentVerificationResponse {
  verification_method: SupportingDocumentVerificationResponseVerificationMethod;
  evidence_type: SupportingDocumentEvidenceType;
  billable: boolean;
  outcome: ApiValidationStatus;
  extracted_details: SupportingDocumentVerificationResponseExtractedDetails;
  validations: SupportingDocumentVerificationResponseValidations;
}

export namespace SupportingDocumentVerificationResponse {
  export type VerificationMethod = SupportingDocumentVerificationResponseVerificationMethod;
  export const VerificationMethod = SupportingDocumentVerificationResponseVerificationMethod;
  export type ExtractedDetails = SupportingDocumentVerificationResponseExtractedDetails;
  export type Validations = SupportingDocumentVerificationResponseValidations;
}

/**
 * Cast schema for the SupportingDocumentVerificationResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentVerificationResponse =
  core.cast.identity<SupportingDocumentVerificationResponse>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentVerificationResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentVerificationResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'verification_method',
      'evidence_type',
      'billable',
      'outcome',
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
      verification_method: raw['verification_method'],
      evidence_type: raw['evidence_type'],
      billable: raw['billable'],
      outcome: raw['outcome'],
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'verification_method',
    'evidence_type',
    'billable',
    'outcome',
    'extracted_details',
    'validations',
  ],
);

/**
 * Cast schema for mapping the SupportingDocumentVerificationResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentVerificationResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      verification_method: raw['verification_method'],
      evidence_type: raw['evidence_type'],
      billable: raw['billable'],
      outcome: raw['outcome'],
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'verification_method',
    'evidence_type',
    'billable',
    'outcome',
    'extracted_details',
    'validations',
  ],
);
