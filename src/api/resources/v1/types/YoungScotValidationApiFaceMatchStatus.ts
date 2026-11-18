import * as core from '../../../../core';

export const YoungScotValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type YoungScotValidationApiFaceMatchStatus =
  (typeof YoungScotValidationApiFaceMatchStatus)[keyof typeof YoungScotValidationApiFaceMatchStatus];

export const youngScotValidationApiFaceMatchStatus =
  core.cast.identity<YoungScotValidationApiFaceMatchStatus>();
