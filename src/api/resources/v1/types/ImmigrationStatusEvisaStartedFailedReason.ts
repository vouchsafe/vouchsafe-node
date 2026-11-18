import * as core from '../../../../core';

export const ImmigrationStatusEvisaStartedFailedReason = {
  ShareCodeError: 'SHARE_CODE_ERROR',
  IncorrectDetails: 'INCORRECT_DETAILS',
  EvisaNotYetValid: 'EVISA_NOT_YET_VALID',
  UnrecognisedIndefiniteStatus: 'UNRECOGNISED_INDEFINITE_STATUS',
} as const;

export type ImmigrationStatusEvisaStartedFailedReason =
  (typeof ImmigrationStatusEvisaStartedFailedReason)[keyof typeof ImmigrationStatusEvisaStartedFailedReason];

export const immigrationStatusEvisaStartedFailedReason =
  core.cast.identity<ImmigrationStatusEvisaStartedFailedReason>();
