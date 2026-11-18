import * as core from '../../../../core';

export const ArtefactApiRole = {
  Document: 'document',
  BackSide: 'back_side',
  FaceScan: 'face_scan',
} as const;

export type ArtefactApiRole = (typeof ArtefactApiRole)[keyof typeof ArtefactApiRole];

export const artefactApiRole = core.cast.identity<ArtefactApiRole>();
