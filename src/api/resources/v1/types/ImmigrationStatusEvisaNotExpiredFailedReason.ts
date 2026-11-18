import * as core from '../../../../core';

export const ImmigrationStatusEvisaNotExpiredFailedReason = {
  ShareCodeError: 'SHARE_CODE_ERROR',
  IncorrectDetails: 'INCORRECT_DETAILS',
  EvisaNotYetValid: 'EVISA_NOT_YET_VALID',
  ExpiryDatePassed: 'EXPIRY_DATE_PASSED',
  UnrecognisedIndefiniteStatus: 'UNRECOGNISED_INDEFINITE_STATUS',
} as const;

export type ImmigrationStatusEvisaNotExpiredFailedReason =
  (typeof ImmigrationStatusEvisaNotExpiredFailedReason)[keyof typeof ImmigrationStatusEvisaNotExpiredFailedReason];

export const immigrationStatusEvisaNotExpiredFailedReason =
  core.cast.identity<ImmigrationStatusEvisaNotExpiredFailedReason>();
