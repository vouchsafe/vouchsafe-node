import * as core from '../../../../core';

export const CertifiedCheckType = {
  RightToWork: 'right_to_work',
  RightToRent: 'right_to_rent',
  DisclosureAndBarringService: 'disclosure_and_barring_service',
} as const;

export type CertifiedCheckType = (typeof CertifiedCheckType)[keyof typeof CertifiedCheckType];

export const certifiedCheckType = core.cast.identity<CertifiedCheckType>();
