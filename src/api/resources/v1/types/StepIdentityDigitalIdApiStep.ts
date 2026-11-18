import * as core from '../../../../core';

export const StepIdentityDigitalIdApiStep = {
  StepIdentity: 'step_identity',
} as const;

export type StepIdentityDigitalIdApiStep =
  (typeof StepIdentityDigitalIdApiStep)[keyof typeof StepIdentityDigitalIdApiStep];

export const stepIdentityDigitalIdApiStep = core.cast.identity<StepIdentityDigitalIdApiStep>();
