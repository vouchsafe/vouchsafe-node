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
 * Cast schema for the RightToRentVerificationResponseValidations model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const rightToRentVerificationResponseValidations =
  core.cast.identity<RightToRentVerificationResponseValidations>();

export type RightToRentVerificationResponseValidations = EvisaValidations | RecordStringNever;

export const rightToRentVerificationResponseValidationsResponse =
  core.cast.identity<RightToRentVerificationResponseValidations>();

export const rightToRentVerificationResponseValidationsRequest =
  core.cast.identity<RightToRentVerificationResponseValidations>();
