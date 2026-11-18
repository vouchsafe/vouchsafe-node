import * as core from '../../../../core';

export const UnfamiliarPhotoIdValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type UnfamiliarPhotoIdValidationApiFaceMatchStatus =
  (typeof UnfamiliarPhotoIdValidationApiFaceMatchStatus)[keyof typeof UnfamiliarPhotoIdValidationApiFaceMatchStatus];

export const unfamiliarPhotoIdValidationApiFaceMatchStatus =
  core.cast.identity<UnfamiliarPhotoIdValidationApiFaceMatchStatus>();
