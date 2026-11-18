import * as core from '../../../../core';
import {
  SupportingDocumentValidations,
  supportingDocumentValidations,
  supportingDocumentValidationsRequest,
  supportingDocumentValidationsResponse,
} from './SupportingDocumentValidations';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the SupportingDocumentVerificationResponseValidations model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const supportingDocumentVerificationResponseValidations =
  core.cast.identity<SupportingDocumentVerificationResponseValidations>();

export type SupportingDocumentVerificationResponseValidations =
  | SupportingDocumentValidations
  | RecordStringNever;

export const supportingDocumentVerificationResponseValidationsResponse =
  core.cast.identity<SupportingDocumentVerificationResponseValidations>();

export const supportingDocumentVerificationResponseValidationsRequest =
  core.cast.identity<SupportingDocumentVerificationResponseValidations>();
