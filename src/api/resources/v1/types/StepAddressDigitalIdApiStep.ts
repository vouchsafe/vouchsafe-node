import * as core from '../../../../core';

export const StepAddressDigitalIdApiStep = {
  StepAddress: 'step_address',
} as const;

export type StepAddressDigitalIdApiStep =
  (typeof StepAddressDigitalIdApiStep)[keyof typeof StepAddressDigitalIdApiStep];

export const stepAddressDigitalIdApiStep = core.cast.identity<StepAddressDigitalIdApiStep>();
