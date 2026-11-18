import * as core from '../../../../core';

export const NationalIdValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type NationalIdValidationApiFaceMatchStatus =
  (typeof NationalIdValidationApiFaceMatchStatus)[keyof typeof NationalIdValidationApiFaceMatchStatus];

export const nationalIdValidationApiFaceMatchStatus =
  core.cast.identity<NationalIdValidationApiFaceMatchStatus>();
