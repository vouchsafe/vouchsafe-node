import * as core from '../../../../core';
import {
  EvisaValidations,
  evisaValidations,
  evisaValidationsRequest,
  evisaValidationsResponse,
} from './EvisaValidations';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the RightToWorkVerificationResponseValidations model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const rightToWorkVerificationResponseValidations =
  core.cast.identity<RightToWorkVerificationResponseValidations>();

export type RightToWorkVerificationResponseValidations = EvisaValidations | RecordStringNever;

export const rightToWorkVerificationResponseValidationsResponse =
  core.cast.identity<RightToWorkVerificationResponseValidations>();

export const rightToWorkVerificationResponseValidationsRequest =
  core.cast.identity<RightToWorkVerificationResponseValidations>();
