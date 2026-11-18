import * as core from '../../../../core';

export const NecValidationApiFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type NecValidationApiFaceMatchStatus =
  (typeof NecValidationApiFaceMatchStatus)[keyof typeof NecValidationApiFaceMatchStatus];

export const necValidationApiFaceMatchStatus =
  core.cast.identity<NecValidationApiFaceMatchStatus>();
