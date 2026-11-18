import * as core from '../../../../core';
import {
  PhotoIdVerificationResponseVerificationMethod,
  photoIdVerificationResponseVerificationMethod,
} from './PhotoIdVerificationResponseVerificationMethod';
import { PhotoIdMethodResponse, photoIdMethodResponse } from './PhotoIdMethodResponse';
import {
  PhotoIdVerificationResponseOutcome,
  photoIdVerificationResponseOutcome,
} from './PhotoIdVerificationResponseOutcome';
import {
  PhotoIdExtractedDetails,
  photoIdExtractedDetails,
  photoIdExtractedDetailsRequest,
  photoIdExtractedDetailsResponse,
} from './PhotoIdExtractedDetails';
import {
  PhotoIdValidation,
  photoIdValidation,
  photoIdValidationRequest,
  photoIdValidationResponse,
} from './PhotoIdValidation';

export interface PhotoIdVerificationResponse {
  verification_method: PhotoIdVerificationResponseVerificationMethod;
  billable: boolean;
  evidence_type: PhotoIdMethodResponse;
  outcome: PhotoIdVerificationResponseOutcome;
  extracted_details: PhotoIdExtractedDetails;
  validations: PhotoIdValidation;
}

export namespace PhotoIdVerificationResponse {
  export type VerificationMethod = PhotoIdVerificationResponseVerificationMethod;
  export const VerificationMethod = PhotoIdVerificationResponseVerificationMethod;
  export type Outcome = PhotoIdVerificationResponseOutcome;
  export const Outcome = PhotoIdVerificationResponseOutcome;
}

/**
 * Cast schema for the PhotoIdVerificationResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const photoIdVerificationResponse = core.cast.identity<PhotoIdVerificationResponse>();

/**
 * Cast schema for mapping API responses to the PhotoIdVerificationResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const photoIdVerificationResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'verification_method',
      'billable',
      'evidence_type',
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
      billable: raw['billable'],
      evidence_type: raw['evidence_type'],
      outcome: raw['outcome'],
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'verification_method',
    'billable',
    'evidence_type',
    'outcome',
    'extracted_details',
    'validations',
  ],
);

/**
 * Cast schema for mapping the PhotoIdVerificationResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const photoIdVerificationResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      verification_method: raw['verification_method'],
      billable: raw['billable'],
      evidence_type: raw['evidence_type'],
      outcome: raw['outcome'],
      extracted_details: raw['extracted_details'],
      validations: raw['validations'],
    };
  },
  [
    'verification_method',
    'billable',
    'evidence_type',
    'outcome',
    'extracted_details',
    'validations',
  ],
);
