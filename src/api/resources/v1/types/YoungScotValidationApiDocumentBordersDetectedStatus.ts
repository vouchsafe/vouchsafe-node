import * as core from '../../../../core';

export const YoungScotValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type YoungScotValidationApiDocumentBordersDetectedStatus =
  (typeof YoungScotValidationApiDocumentBordersDetectedStatus)[keyof typeof YoungScotValidationApiDocumentBordersDetectedStatus];

export const youngScotValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<YoungScotValidationApiDocumentBordersDetectedStatus>();
