import * as core from '../../../../core';

export const StepIdentityVouchApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type StepIdentityVouchApiOutcome =
  (typeof StepIdentityVouchApiOutcome)[keyof typeof StepIdentityVouchApiOutcome];

export const stepIdentityVouchApiOutcome = core.cast.identity<StepIdentityVouchApiOutcome>();
