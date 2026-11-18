import * as core from '../../../../core';

export const FailedReasonInvalidMrzCode = {
  InvalidMrzCode: 'INVALID_MRZ_CODE',
} as const;

export type FailedReasonInvalidMrzCode =
  (typeof FailedReasonInvalidMrzCode)[keyof typeof FailedReasonInvalidMrzCode];

export const failedReasonInvalidMrzCode = core.cast.identity<FailedReasonInvalidMrzCode>();
