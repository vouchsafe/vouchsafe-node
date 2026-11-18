import * as core from '../../../../core';

export const EvisaEvidenceApi = {
  RightToWork: 'right_to_work',
  RightToRent: 'right_to_rent',
  ImmigrationStatus: 'immigration_status',
} as const;

export type EvisaEvidenceApi = (typeof EvisaEvidenceApi)[keyof typeof EvisaEvidenceApi];

export const evisaEvidenceApi = core.cast.identity<EvisaEvidenceApi>();
