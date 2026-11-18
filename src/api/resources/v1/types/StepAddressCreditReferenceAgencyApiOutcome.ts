import * as core from '../../../../core';

export const StepAddressCreditReferenceAgencyApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type StepAddressCreditReferenceAgencyApiOutcome =
  (typeof StepAddressCreditReferenceAgencyApiOutcome)[keyof typeof StepAddressCreditReferenceAgencyApiOutcome];

export const stepAddressCreditReferenceAgencyApiOutcome =
  core.cast.identity<StepAddressCreditReferenceAgencyApiOutcome>();
