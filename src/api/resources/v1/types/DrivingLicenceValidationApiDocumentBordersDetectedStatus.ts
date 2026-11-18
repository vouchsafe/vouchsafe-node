import * as core from '../../../../core';

export const DrivingLicenceValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type DrivingLicenceValidationApiDocumentBordersDetectedStatus =
  (typeof DrivingLicenceValidationApiDocumentBordersDetectedStatus)[keyof typeof DrivingLicenceValidationApiDocumentBordersDetectedStatus];

export const drivingLicenceValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<DrivingLicenceValidationApiDocumentBordersDetectedStatus>();
