import * as core from '../../../../core';
import {
  PassportExtractedDetails,
  passportExtractedDetails,
  passportExtractedDetailsRequest,
  passportExtractedDetailsResponse,
} from './PassportExtractedDetails';
import {
  NationalIdExtractedDetails,
  nationalIdExtractedDetails,
  nationalIdExtractedDetailsRequest,
  nationalIdExtractedDetailsResponse,
} from './NationalIdExtractedDetails';
import {
  DrivingLicenceExtractedDetails,
  drivingLicenceExtractedDetails,
  drivingLicenceExtractedDetailsRequest,
  drivingLicenceExtractedDetailsResponse,
} from './DrivingLicenceExtractedDetails';
import {
  PassCardExtractedDetails,
  passCardExtractedDetails,
  passCardExtractedDetailsRequest,
  passCardExtractedDetailsResponse,
} from './PassCardExtractedDetails';
import {
  UnfamiliarPhotoIdExtractedDetails,
  unfamiliarPhotoIdExtractedDetails,
  unfamiliarPhotoIdExtractedDetailsRequest,
  unfamiliarPhotoIdExtractedDetailsResponse,
} from './UnfamiliarPhotoIdExtractedDetails';

/**
 * Cast schema for the PhotoIdExtractedDetails model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const photoIdExtractedDetails = core.cast.identity<PhotoIdExtractedDetails>();

export type PhotoIdExtractedDetails =
  | PassportExtractedDetails
  | NationalIdExtractedDetails
  | DrivingLicenceExtractedDetails
  | PassCardExtractedDetails
  | UnfamiliarPhotoIdExtractedDetails;

export const photoIdExtractedDetailsResponse = core.cast.identity<PhotoIdExtractedDetails>();

export const photoIdExtractedDetailsRequest = core.cast.identity<PhotoIdExtractedDetails>();
