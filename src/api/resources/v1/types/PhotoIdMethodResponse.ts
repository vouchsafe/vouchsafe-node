import * as core from '../../../../core';

export const PhotoIdMethodResponse = {
  Passport: 'passport',
  DrivingLicence: 'driving_licence',
  PassCard: 'pass_card',
  NationalId: 'national_id',
  UnfamiliarPhotoId: 'unfamiliar_photo_id',
} as const;

export type PhotoIdMethodResponse =
  (typeof PhotoIdMethodResponse)[keyof typeof PhotoIdMethodResponse];

export const photoIdMethodResponse = core.cast.identity<PhotoIdMethodResponse>();
