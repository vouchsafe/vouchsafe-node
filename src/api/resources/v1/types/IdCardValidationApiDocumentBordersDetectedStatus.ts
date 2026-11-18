import * as core from '../../../../core';

export const IdCardValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type IdCardValidationApiDocumentBordersDetectedStatus =
  (typeof IdCardValidationApiDocumentBordersDetectedStatus)[keyof typeof IdCardValidationApiDocumentBordersDetectedStatus];

export const idCardValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<IdCardValidationApiDocumentBordersDetectedStatus>();
