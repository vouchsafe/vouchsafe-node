import * as core from '../../../../core';

export const ArtefactRoleType = {
  Document: 'document',
  Backside: 'backside',
  FaceScan: 'faceScan',
} as const;

export type ArtefactRoleType = (typeof ArtefactRoleType)[keyof typeof ArtefactRoleType];

export const artefactRoleType = core.cast.identity<ArtefactRoleType>();
