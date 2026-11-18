import * as core from '../../../../core';

export const NecValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type NecValidationApiDocumentBordersDetectedStatus =
  (typeof NecValidationApiDocumentBordersDetectedStatus)[keyof typeof NecValidationApiDocumentBordersDetectedStatus];

export const necValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<NecValidationApiDocumentBordersDetectedStatus>();
