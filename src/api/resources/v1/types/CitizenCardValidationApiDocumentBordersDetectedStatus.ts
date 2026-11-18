import * as core from '../../../../core';

export const CitizenCardValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type CitizenCardValidationApiDocumentBordersDetectedStatus =
  (typeof CitizenCardValidationApiDocumentBordersDetectedStatus)[keyof typeof CitizenCardValidationApiDocumentBordersDetectedStatus];

export const citizenCardValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<CitizenCardValidationApiDocumentBordersDetectedStatus>();
