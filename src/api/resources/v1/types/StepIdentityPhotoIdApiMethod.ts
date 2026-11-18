import * as core from '../../../../core';

export const StepIdentityPhotoIdApiMethod = {
  PhotoId: 'photo_id',
} as const;

export type StepIdentityPhotoIdApiMethod =
  (typeof StepIdentityPhotoIdApiMethod)[keyof typeof StepIdentityPhotoIdApiMethod];

export const stepIdentityPhotoIdApiMethod = core.cast.identity<StepIdentityPhotoIdApiMethod>();
