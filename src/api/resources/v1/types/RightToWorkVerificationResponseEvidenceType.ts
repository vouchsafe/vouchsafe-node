import * as core from '../../../../core';

export const RightToWorkVerificationResponseEvidenceType = {
  RightToWork: 'right_to_work',
} as const;

export type RightToWorkVerificationResponseEvidenceType =
  (typeof RightToWorkVerificationResponseEvidenceType)[keyof typeof RightToWorkVerificationResponseEvidenceType];

export const rightToWorkVerificationResponseEvidenceType =
  core.cast.identity<RightToWorkVerificationResponseEvidenceType>();
