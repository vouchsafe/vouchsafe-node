import * as core from '../../../../core';

export const RightToRentVerificationResponseVerificationMethod = {
  Evisa: 'evisa',
} as const;

export type RightToRentVerificationResponseVerificationMethod =
  (typeof RightToRentVerificationResponseVerificationMethod)[keyof typeof RightToRentVerificationResponseVerificationMethod];

export const rightToRentVerificationResponseVerificationMethod =
  core.cast.identity<RightToRentVerificationResponseVerificationMethod>();
