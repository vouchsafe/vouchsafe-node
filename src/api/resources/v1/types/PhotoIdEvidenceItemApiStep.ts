import * as core from '../../../../core';

export const PhotoIdEvidenceItemApiStep = {
  PhotoId: 'photo_id',
} as const;

export type PhotoIdEvidenceItemApiStep =
  (typeof PhotoIdEvidenceItemApiStep)[keyof typeof PhotoIdEvidenceItemApiStep];

export const photoIdEvidenceItemApiStep = core.cast.identity<PhotoIdEvidenceItemApiStep>();
