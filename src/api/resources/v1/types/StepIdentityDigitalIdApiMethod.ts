import * as core from '../../../../core';

export const StepIdentityDigitalIdApiMethod = {
  DigitalId: 'digital_id',
} as const;

export type StepIdentityDigitalIdApiMethod =
  (typeof StepIdentityDigitalIdApiMethod)[keyof typeof StepIdentityDigitalIdApiMethod];

export const stepIdentityDigitalIdApiMethod = core.cast.identity<StepIdentityDigitalIdApiMethod>();
