import * as core from '../../../../core';
import {
  RightToRentExtractedDetails,
  rightToRentExtractedDetails,
  rightToRentExtractedDetailsRequest,
  rightToRentExtractedDetailsResponse,
} from './RightToRentExtractedDetails';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the RightToRentVerificationResponseExtractedDetails model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const rightToRentVerificationResponseExtractedDetails =
  core.cast.identity<RightToRentVerificationResponseExtractedDetails>();

export type RightToRentVerificationResponseExtractedDetails =
  | RightToRentExtractedDetails
  | RecordStringNever;

export const rightToRentVerificationResponseExtractedDetailsResponse =
  core.cast.identity<RightToRentVerificationResponseExtractedDetails>();

export const rightToRentVerificationResponseExtractedDetailsRequest =
  core.cast.identity<RightToRentVerificationResponseExtractedDetails>();
