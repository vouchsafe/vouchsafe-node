import * as core from '../../../../core';

export const ImmigrationStatusVerificationResponseEvidenceType = {
  ImmigrationStatus: 'immigration_status',
} as const;

export type ImmigrationStatusVerificationResponseEvidenceType =
  (typeof ImmigrationStatusVerificationResponseEvidenceType)[keyof typeof ImmigrationStatusVerificationResponseEvidenceType];

export const immigrationStatusVerificationResponseEvidenceType =
  core.cast.identity<ImmigrationStatusVerificationResponseEvidenceType>();
