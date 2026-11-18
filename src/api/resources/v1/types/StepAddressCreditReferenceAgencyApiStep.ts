import * as core from '../../../../core';

export const StepAddressCreditReferenceAgencyApiStep = {
  StepAddress: 'step_address',
} as const;

export type StepAddressCreditReferenceAgencyApiStep =
  (typeof StepAddressCreditReferenceAgencyApiStep)[keyof typeof StepAddressCreditReferenceAgencyApiStep];

export const stepAddressCreditReferenceAgencyApiStep =
  core.cast.identity<StepAddressCreditReferenceAgencyApiStep>();
