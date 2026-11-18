import * as core from '../../../../core';

export const CitizenCardValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type CitizenCardValidationApiFaceMatchStatus =
  (typeof CitizenCardValidationApiFaceMatchStatus)[keyof typeof CitizenCardValidationApiFaceMatchStatus];

export const citizenCardValidationApiFaceMatchStatus =
  core.cast.identity<CitizenCardValidationApiFaceMatchStatus>();
