import * as core from '../../../../core';

export const FailedReasonIncompleteMrzData = {
  IncompleteMrzData: 'INCOMPLETE_MRZ_DATA',
} as const;

export type FailedReasonIncompleteMrzData =
  (typeof FailedReasonIncompleteMrzData)[keyof typeof FailedReasonIncompleteMrzData];

export const failedReasonIncompleteMrzData = core.cast.identity<FailedReasonIncompleteMrzData>();
