import * as core from '../../../../core';
import {
  PassportValidation,
  passportValidation,
  passportValidationRequest,
  passportValidationResponse,
} from './PassportValidation';
import {
  NationalIdValidation,
  nationalIdValidation,
  nationalIdValidationRequest,
  nationalIdValidationResponse,
} from './NationalIdValidation';
import {
  DrivingLicenceValidation,
  drivingLicenceValidation,
  drivingLicenceValidationRequest,
  drivingLicenceValidationResponse,
} from './DrivingLicenceValidation';
import {
  PassCardValidation,
  passCardValidation,
  passCardValidationRequest,
  passCardValidationResponse,
} from './PassCardValidation';
import {
  UnfamiliarPhotoIdValidation,
  unfamiliarPhotoIdValidation,
  unfamiliarPhotoIdValidationRequest,
  unfamiliarPhotoIdValidationResponse,
} from './UnfamiliarPhotoIdValidation';

/**
 * Cast schema for the PhotoIdValidation model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const photoIdValidation = core.cast.identity<PhotoIdValidation>();

export type PhotoIdValidation =
  | PassportValidation
  | NationalIdValidation
  | DrivingLicenceValidation
  | PassCardValidation
  | UnfamiliarPhotoIdValidation;

export const photoIdValidationResponse = core.cast.identity<PhotoIdValidation>();

export const photoIdValidationRequest = core.cast.identity<PhotoIdValidation>();
