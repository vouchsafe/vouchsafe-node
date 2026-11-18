import * as core from '../../../../core';

export const StepAddressDigitalIdApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type StepAddressDigitalIdApiOutcome =
  (typeof StepAddressDigitalIdApiOutcome)[keyof typeof StepAddressDigitalIdApiOutcome];

export const stepAddressDigitalIdApiOutcome = core.cast.identity<StepAddressDigitalIdApiOutcome>();
