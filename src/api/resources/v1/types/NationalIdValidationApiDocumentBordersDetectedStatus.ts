import * as core from '../../../../core';

export const NationalIdValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type NationalIdValidationApiDocumentBordersDetectedStatus =
  (typeof NationalIdValidationApiDocumentBordersDetectedStatus)[keyof typeof NationalIdValidationApiDocumentBordersDetectedStatus];

export const nationalIdValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<NationalIdValidationApiDocumentBordersDetectedStatus>();
