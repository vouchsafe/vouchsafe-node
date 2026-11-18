import * as core from '../../../../core';

export const UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus =
  (typeof UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus)[keyof typeof UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus];

export const unfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus =
  core.cast.identity<UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus>();
