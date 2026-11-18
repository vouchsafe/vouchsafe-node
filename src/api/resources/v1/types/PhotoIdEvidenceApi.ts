import * as core from '../../../../core';

export const PhotoIdEvidenceApi = {
  UnfamiliarPhotoId: 'unfamiliar_photo_id',
  IdCard: 'id_card',
  Passport: 'passport',
  DrivingLicence: 'driving_licence',
  YoungScot: 'young_scot',
  NationalEntitlementCard: 'national_entitlement_card',
  NationalId: 'national_id',
  CitizenCard: 'citizen_card',
} as const;

export type PhotoIdEvidenceApi = (typeof PhotoIdEvidenceApi)[keyof typeof PhotoIdEvidenceApi];

export const photoIdEvidenceApi = core.cast.identity<PhotoIdEvidenceApi>();
