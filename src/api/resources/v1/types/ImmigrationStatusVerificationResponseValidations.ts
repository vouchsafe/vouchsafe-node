import * as core from '../../../../core';
import {
  ImmigrationStatusEvisaValidations,
  immigrationStatusEvisaValidations,
  immigrationStatusEvisaValidationsRequest,
  immigrationStatusEvisaValidationsResponse,
} from './ImmigrationStatusEvisaValidations';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the ImmigrationStatusVerificationResponseValidations model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const immigrationStatusVerificationResponseValidations =
  core.cast.identity<ImmigrationStatusVerificationResponseValidations>();

export type ImmigrationStatusVerificationResponseValidations =
  | ImmigrationStatusEvisaValidations
  | RecordStringNever;

export const immigrationStatusVerificationResponseValidationsResponse =
  core.cast.identity<ImmigrationStatusVerificationResponseValidations>();

export const immigrationStatusVerificationResponseValidationsRequest =
  core.cast.identity<ImmigrationStatusVerificationResponseValidations>();
