import * as core from '../../../../core';

export const EvisaExistsFailedReason = {
  ShareCodeError: 'SHARE_CODE_ERROR',
  IncorrectDetails: 'INCORRECT_DETAILS',
} as const;

export type EvisaExistsFailedReason =
  (typeof EvisaExistsFailedReason)[keyof typeof EvisaExistsFailedReason];

export const evisaExistsFailedReason = core.cast.identity<EvisaExistsFailedReason>();
