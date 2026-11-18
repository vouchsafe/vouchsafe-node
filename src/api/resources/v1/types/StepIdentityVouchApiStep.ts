import * as core from '../../../../core';

export const StepIdentityVouchApiStep = {
  StepIdentity: 'step_identity',
} as const;

export type StepIdentityVouchApiStep =
  (typeof StepIdentityVouchApiStep)[keyof typeof StepIdentityVouchApiStep];

export const stepIdentityVouchApiStep = core.cast.identity<StepIdentityVouchApiStep>();
