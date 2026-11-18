import * as core from '../../../../core';

export const CompoundIdentifiersCheckPassCardFailedReasonStatus = {
  Fail: 'fail',
} as const;

export type CompoundIdentifiersCheckPassCardFailedReasonStatus =
  (typeof CompoundIdentifiersCheckPassCardFailedReasonStatus)[keyof typeof CompoundIdentifiersCheckPassCardFailedReasonStatus];

export const compoundIdentifiersCheckPassCardFailedReasonStatus =
  core.cast.identity<CompoundIdentifiersCheckPassCardFailedReasonStatus>();
