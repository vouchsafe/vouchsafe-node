import * as core from '../../../../core';

export const ImmigrationStatusVerificationResponseVerificationMethod = {
  Evisa: 'evisa',
} as const;

export type ImmigrationStatusVerificationResponseVerificationMethod =
  (typeof ImmigrationStatusVerificationResponseVerificationMethod)[keyof typeof ImmigrationStatusVerificationResponseVerificationMethod];

export const immigrationStatusVerificationResponseVerificationMethod =
  core.cast.identity<ImmigrationStatusVerificationResponseVerificationMethod>();
