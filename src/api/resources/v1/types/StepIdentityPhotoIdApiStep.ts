import * as core from '../../../../core';

export const StepIdentityPhotoIdApiStep = {
  StepIdentity: 'step_identity',
} as const;

export type StepIdentityPhotoIdApiStep =
  (typeof StepIdentityPhotoIdApiStep)[keyof typeof StepIdentityPhotoIdApiStep];

export const stepIdentityPhotoIdApiStep = core.cast.identity<StepIdentityPhotoIdApiStep>();
