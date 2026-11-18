import * as core from '../../../../core';

export const EvisaNotExpiredFailedReason = {
  ShareCodeError: 'SHARE_CODE_ERROR',
  IncorrectDetails: 'INCORRECT_DETAILS',
  EvisaNotYetValid: 'EVISA_NOT_YET_VALID',
  ExpiryDatePassed: 'EXPIRY_DATE_PASSED',
} as const;

export type EvisaNotExpiredFailedReason =
  (typeof EvisaNotExpiredFailedReason)[keyof typeof EvisaNotExpiredFailedReason];

export const evisaNotExpiredFailedReason = core.cast.identity<EvisaNotExpiredFailedReason>();
