import * as core from '../../../../core';

export const PassportValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type PassportValidationApiFaceMatchStatus =
  (typeof PassportValidationApiFaceMatchStatus)[keyof typeof PassportValidationApiFaceMatchStatus];

export const passportValidationApiFaceMatchStatus =
  core.cast.identity<PassportValidationApiFaceMatchStatus>();
