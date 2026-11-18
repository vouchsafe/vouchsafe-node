import * as core from '../../../../core';

export const OfaCheckKindApi = {
  EmailFootprintAnalysis: 'email_footprint_analysis',
  PhoneFootprintAnalysis: 'phone_footprint_analysis',
} as const;

export type OfaCheckKindApi = (typeof OfaCheckKindApi)[keyof typeof OfaCheckKindApi];

export const ofaCheckKindApi = core.cast.identity<OfaCheckKindApi>();
