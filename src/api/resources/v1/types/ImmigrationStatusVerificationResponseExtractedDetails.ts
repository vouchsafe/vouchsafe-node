import * as core from '../../../../core';
import {
  ImmigrationStatusExtractedDetails,
  immigrationStatusExtractedDetails,
  immigrationStatusExtractedDetailsRequest,
  immigrationStatusExtractedDetailsResponse,
} from './ImmigrationStatusExtractedDetails';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the ImmigrationStatusVerificationResponseExtractedDetails model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const immigrationStatusVerificationResponseExtractedDetails =
  core.cast.identity<ImmigrationStatusVerificationResponseExtractedDetails>();

export type ImmigrationStatusVerificationResponseExtractedDetails =
  | ImmigrationStatusExtractedDetails
  | RecordStringNever;

export const immigrationStatusVerificationResponseExtractedDetailsResponse =
  core.cast.identity<ImmigrationStatusVerificationResponseExtractedDetails>();

export const immigrationStatusVerificationResponseExtractedDetailsRequest =
  core.cast.identity<ImmigrationStatusVerificationResponseExtractedDetails>();
