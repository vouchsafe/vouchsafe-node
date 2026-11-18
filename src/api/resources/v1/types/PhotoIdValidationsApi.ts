import * as core from '../../../../core';
import {
  PassportValidationApi,
  passportValidationApi,
  passportValidationApiRequest,
  passportValidationApiResponse,
} from './PassportValidationApi';
import {
  DrivingLicenceValidationApi,
  drivingLicenceValidationApi,
  drivingLicenceValidationApiRequest,
  drivingLicenceValidationApiResponse,
} from './DrivingLicenceValidationApi';
import {
  NationalIdValidationApi,
  nationalIdValidationApi,
  nationalIdValidationApiRequest,
  nationalIdValidationApiResponse,
} from './NationalIdValidationApi';
import {
  CitizenCardValidationApi,
  citizenCardValidationApi,
  citizenCardValidationApiRequest,
  citizenCardValidationApiResponse,
} from './CitizenCardValidationApi';
import {
  YoungScotValidationApi,
  youngScotValidationApi,
  youngScotValidationApiRequest,
  youngScotValidationApiResponse,
} from './YoungScotValidationApi';
import {
  NecValidationApi,
  necValidationApi,
  necValidationApiRequest,
  necValidationApiResponse,
} from './NecValidationApi';
import {
  IdCardValidationApi,
  idCardValidationApi,
  idCardValidationApiRequest,
  idCardValidationApiResponse,
} from './IdCardValidationApi';
import {
  UnfamiliarPhotoIdValidationApi,
  unfamiliarPhotoIdValidationApi,
  unfamiliarPhotoIdValidationApiRequest,
  unfamiliarPhotoIdValidationApiResponse,
} from './UnfamiliarPhotoIdValidationApi';

/**
 * Cast schema for the PhotoIdValidationsApi model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const photoIdValidationsApi = core.cast.identity<PhotoIdValidationsApi>();

export type PhotoIdValidationsApi =
  | PassportValidationApi
  | DrivingLicenceValidationApi
  | NationalIdValidationApi
  | CitizenCardValidationApi
  | YoungScotValidationApi
  | NecValidationApi
  | IdCardValidationApi
  | UnfamiliarPhotoIdValidationApi;

export const photoIdValidationsApiResponse = core.cast.identity<PhotoIdValidationsApi>();

export const photoIdValidationsApiRequest = core.cast.identity<PhotoIdValidationsApi>();
