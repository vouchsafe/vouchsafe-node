import * as core from '../../../../core';
import {
  CitizenCardDetailsApi,
  citizenCardDetailsApi,
  citizenCardDetailsApiRequest,
  citizenCardDetailsApiResponse,
} from './CitizenCardDetailsApi';
import {
  PassportDetailsApi,
  passportDetailsApi,
  passportDetailsApiRequest,
  passportDetailsApiResponse,
} from './PassportDetailsApi';
import {
  DrivingLicenceDetailsApi,
  drivingLicenceDetailsApi,
  drivingLicenceDetailsApiRequest,
  drivingLicenceDetailsApiResponse,
} from './DrivingLicenceDetailsApi';
import {
  YoungScotDetailsApi,
  youngScotDetailsApi,
  youngScotDetailsApiRequest,
  youngScotDetailsApiResponse,
} from './YoungScotDetailsApi';
import {
  NecDetailsApi,
  necDetailsApi,
  necDetailsApiRequest,
  necDetailsApiResponse,
} from './NecDetailsApi';
import {
  NationalIdDetailsApi,
  nationalIdDetailsApi,
  nationalIdDetailsApiRequest,
  nationalIdDetailsApiResponse,
} from './NationalIdDetailsApi';
import {
  UnfamiliarPhotoIdDetailsApi,
  unfamiliarPhotoIdDetailsApi,
  unfamiliarPhotoIdDetailsApiRequest,
  unfamiliarPhotoIdDetailsApiResponse,
} from './UnfamiliarPhotoIdDetailsApi';

/**
 * Cast schema for the PhotoIdExtractedDetailsApi model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const photoIdExtractedDetailsApi = core.cast.identity<PhotoIdExtractedDetailsApi>();

export type PhotoIdExtractedDetailsApi =
  | CitizenCardDetailsApi
  | PassportDetailsApi
  | DrivingLicenceDetailsApi
  | YoungScotDetailsApi
  | NecDetailsApi
  | NationalIdDetailsApi
  | UnfamiliarPhotoIdDetailsApi;

export const photoIdExtractedDetailsApiResponse = core.cast.identity<PhotoIdExtractedDetailsApi>();

export const photoIdExtractedDetailsApiRequest = core.cast.identity<PhotoIdExtractedDetailsApi>();
