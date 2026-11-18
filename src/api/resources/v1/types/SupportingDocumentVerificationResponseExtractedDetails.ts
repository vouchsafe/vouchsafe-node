import * as core from '../../../../core';
import {
  SupportingDocumentExtractedDetails,
  supportingDocumentExtractedDetails,
  supportingDocumentExtractedDetailsRequest,
  supportingDocumentExtractedDetailsResponse,
} from './SupportingDocumentExtractedDetails';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the SupportingDocumentVerificationResponseExtractedDetails model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const supportingDocumentVerificationResponseExtractedDetails =
  core.cast.identity<SupportingDocumentVerificationResponseExtractedDetails>();

export type SupportingDocumentVerificationResponseExtractedDetails =
  | SupportingDocumentExtractedDetails
  | RecordStringNever;

export const supportingDocumentVerificationResponseExtractedDetailsResponse =
  core.cast.identity<SupportingDocumentVerificationResponseExtractedDetails>();

export const supportingDocumentVerificationResponseExtractedDetailsRequest =
  core.cast.identity<SupportingDocumentVerificationResponseExtractedDetails>();
