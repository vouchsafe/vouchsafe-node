import * as core from '../../../../core';

export const FailedReasonMrzNotTd3 = {
  MrzNotTd3: 'MRZ_NOT_TD3',
} as const;

export type FailedReasonMrzNotTd3 =
  (typeof FailedReasonMrzNotTd3)[keyof typeof FailedReasonMrzNotTd3];

export const failedReasonMrzNotTd3 = core.cast.identity<FailedReasonMrzNotTd3>();
