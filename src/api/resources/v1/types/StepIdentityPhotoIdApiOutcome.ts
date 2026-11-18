import * as core from '../../../../core';

export const StepIdentityPhotoIdApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
  InProgress: 'in_progress',
} as const;

export type StepIdentityPhotoIdApiOutcome =
  (typeof StepIdentityPhotoIdApiOutcome)[keyof typeof StepIdentityPhotoIdApiOutcome];

export const stepIdentityPhotoIdApiOutcome = core.cast.identity<StepIdentityPhotoIdApiOutcome>();
