import * as core from '../../../../core';
import {
  RightToWorkExtractedDetails,
  rightToWorkExtractedDetails,
  rightToWorkExtractedDetailsRequest,
  rightToWorkExtractedDetailsResponse,
} from './RightToWorkExtractedDetails';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the RightToWorkVerificationResponseExtractedDetails model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const rightToWorkVerificationResponseExtractedDetails =
  core.cast.identity<RightToWorkVerificationResponseExtractedDetails>();

export type RightToWorkVerificationResponseExtractedDetails =
  | RightToWorkExtractedDetails
  | RecordStringNever;

export const rightToWorkVerificationResponseExtractedDetailsResponse =
  core.cast.identity<RightToWorkVerificationResponseExtractedDetails>();

export const rightToWorkVerificationResponseExtractedDetailsRequest =
  core.cast.identity<RightToWorkVerificationResponseExtractedDetails>();
