import * as core from '../../../../core';

export const FailedReasonInvalidIdFormat = {
  InvalidIdFormat: 'INVALID_ID_FORMAT',
} as const;

export type FailedReasonInvalidIdFormat =
  (typeof FailedReasonInvalidIdFormat)[keyof typeof FailedReasonInvalidIdFormat];

export const failedReasonInvalidIdFormat = core.cast.identity<FailedReasonInvalidIdFormat>();
