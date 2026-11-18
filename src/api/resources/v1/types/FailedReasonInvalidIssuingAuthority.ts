import * as core from '../../../../core';

export const FailedReasonInvalidIssuingAuthority = {
  InvalidIssuingAuthority: 'INVALID_ISSUING_AUTHORITY',
} as const;

export type FailedReasonInvalidIssuingAuthority =
  (typeof FailedReasonInvalidIssuingAuthority)[keyof typeof FailedReasonInvalidIssuingAuthority];

export const failedReasonInvalidIssuingAuthority =
  core.cast.identity<FailedReasonInvalidIssuingAuthority>();
