import * as core from '../../../../core';

export const EvisaValidationsApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type EvisaValidationsApiFaceMatchStatus =
  (typeof EvisaValidationsApiFaceMatchStatus)[keyof typeof EvisaValidationsApiFaceMatchStatus];

export const evisaValidationsApiFaceMatchStatus =
  core.cast.identity<EvisaValidationsApiFaceMatchStatus>();
