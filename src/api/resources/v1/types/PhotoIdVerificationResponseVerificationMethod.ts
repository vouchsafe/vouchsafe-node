import * as core from '../../../../core';

export const PhotoIdVerificationResponseVerificationMethod = {
  PhotoId: 'photo_id',
} as const;

export type PhotoIdVerificationResponseVerificationMethod =
  (typeof PhotoIdVerificationResponseVerificationMethod)[keyof typeof PhotoIdVerificationResponseVerificationMethod];

export const photoIdVerificationResponseVerificationMethod =
  core.cast.identity<PhotoIdVerificationResponseVerificationMethod>();
