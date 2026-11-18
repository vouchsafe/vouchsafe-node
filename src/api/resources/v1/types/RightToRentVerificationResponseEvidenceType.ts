import * as core from '../../../../core';

export const RightToRentVerificationResponseEvidenceType = {
  RightToRent: 'right_to_rent',
} as const;

export type RightToRentVerificationResponseEvidenceType =
  (typeof RightToRentVerificationResponseEvidenceType)[keyof typeof RightToRentVerificationResponseEvidenceType];

export const rightToRentVerificationResponseEvidenceType =
  core.cast.identity<RightToRentVerificationResponseEvidenceType>();
