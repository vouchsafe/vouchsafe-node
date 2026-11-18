import * as core from '../../../../core';

export const StepIdentityVouchApiMethod = {
  Vouch: 'vouch',
} as const;

export type StepIdentityVouchApiMethod =
  (typeof StepIdentityVouchApiMethod)[keyof typeof StepIdentityVouchApiMethod];

export const stepIdentityVouchApiMethod = core.cast.identity<StepIdentityVouchApiMethod>();
