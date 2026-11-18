import * as core from '../../../../core';

export const FailedReasonExpiryDatePassed = {
  ExpiryDatePassed: 'EXPIRY_DATE_PASSED',
} as const;

export type FailedReasonExpiryDatePassed =
  (typeof FailedReasonExpiryDatePassed)[keyof typeof FailedReasonExpiryDatePassed];

export const failedReasonExpiryDatePassed = core.cast.identity<FailedReasonExpiryDatePassed>();
