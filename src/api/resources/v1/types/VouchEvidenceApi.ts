import * as core from '../../../../core';

export const VouchEvidenceApi = {
  ProfessionalReferee: 'professional_referee',
  PersonalReferee: 'personal_referee',
} as const;

export type VouchEvidenceApi = (typeof VouchEvidenceApi)[keyof typeof VouchEvidenceApi];

export const vouchEvidenceApi = core.cast.identity<VouchEvidenceApi>();
