import * as core from '../../../../core';

export const StepAddressDigitalIdApiMethod = {
  DigitalId: 'digital_id',
} as const;

export type StepAddressDigitalIdApiMethod =
  (typeof StepAddressDigitalIdApiMethod)[keyof typeof StepAddressDigitalIdApiMethod];

export const stepAddressDigitalIdApiMethod = core.cast.identity<StepAddressDigitalIdApiMethod>();
