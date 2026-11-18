import * as core from '../../../../core';

export const StepIdentityDigitalIdApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type StepIdentityDigitalIdApiOutcome =
  (typeof StepIdentityDigitalIdApiOutcome)[keyof typeof StepIdentityDigitalIdApiOutcome];

export const stepIdentityDigitalIdApiOutcome =
  core.cast.identity<StepIdentityDigitalIdApiOutcome>();
