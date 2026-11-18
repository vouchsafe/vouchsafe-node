import * as core from '../../../../core';

export const RightToWorkVerificationResponseVerificationMethod = {
  Evisa: 'evisa',
} as const;

export type RightToWorkVerificationResponseVerificationMethod =
  (typeof RightToWorkVerificationResponseVerificationMethod)[keyof typeof RightToWorkVerificationResponseVerificationMethod];

export const rightToWorkVerificationResponseVerificationMethod =
  core.cast.identity<RightToWorkVerificationResponseVerificationMethod>();
