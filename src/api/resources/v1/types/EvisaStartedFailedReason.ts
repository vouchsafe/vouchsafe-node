import * as core from '../../../../core';

export const EvisaStartedFailedReason = {
  ShareCodeError: 'SHARE_CODE_ERROR',
  IncorrectDetails: 'INCORRECT_DETAILS',
  EvisaNotYetValid: 'EVISA_NOT_YET_VALID',
} as const;

export type EvisaStartedFailedReason =
  (typeof EvisaStartedFailedReason)[keyof typeof EvisaStartedFailedReason];

export const evisaStartedFailedReason = core.cast.identity<EvisaStartedFailedReason>();
