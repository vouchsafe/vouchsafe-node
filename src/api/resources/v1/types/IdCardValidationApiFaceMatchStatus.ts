import * as core from '../../../../core';

export const IdCardValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type IdCardValidationApiFaceMatchStatus =
  (typeof IdCardValidationApiFaceMatchStatus)[keyof typeof IdCardValidationApiFaceMatchStatus];

export const idCardValidationApiFaceMatchStatus =
  core.cast.identity<IdCardValidationApiFaceMatchStatus>();
