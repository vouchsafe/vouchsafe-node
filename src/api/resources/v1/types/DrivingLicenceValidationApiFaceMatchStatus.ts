import * as core from '../../../../core';

export const DrivingLicenceValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type DrivingLicenceValidationApiFaceMatchStatus =
  (typeof DrivingLicenceValidationApiFaceMatchStatus)[keyof typeof DrivingLicenceValidationApiFaceMatchStatus];

export const drivingLicenceValidationApiFaceMatchStatus =
  core.cast.identity<DrivingLicenceValidationApiFaceMatchStatus>();
