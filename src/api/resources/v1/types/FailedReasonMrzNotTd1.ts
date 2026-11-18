import * as core from '../../../../core';

export const FailedReasonMrzNotTd1 = {
  MrzNotTd1: 'MRZ_NOT_TD1',
} as const;

export type FailedReasonMrzNotTd1 =
  (typeof FailedReasonMrzNotTd1)[keyof typeof FailedReasonMrzNotTd1];

export const failedReasonMrzNotTd1 = core.cast.identity<FailedReasonMrzNotTd1>();
