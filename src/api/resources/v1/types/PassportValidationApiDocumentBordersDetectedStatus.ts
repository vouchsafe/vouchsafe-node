import * as core from '../../../../core';

export const PassportValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type PassportValidationApiDocumentBordersDetectedStatus =
  (typeof PassportValidationApiDocumentBordersDetectedStatus)[keyof typeof PassportValidationApiDocumentBordersDetectedStatus];

export const passportValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<PassportValidationApiDocumentBordersDetectedStatus>();
