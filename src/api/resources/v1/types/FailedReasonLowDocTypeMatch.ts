import * as core from '../../../../core';

export const FailedReasonLowDocTypeMatch = {
  LowDocTypeMatch: 'LOW_DOC_TYPE_MATCH',
} as const;

export type FailedReasonLowDocTypeMatch =
  (typeof FailedReasonLowDocTypeMatch)[keyof typeof FailedReasonLowDocTypeMatch];

export const failedReasonLowDocTypeMatch = core.cast.identity<FailedReasonLowDocTypeMatch>();
