import * as core from '../../../../core';

export const StepAddressCreditReferenceAgencyApiMethod = {
  CreditReferenceAgency: 'credit_reference_agency',
} as const;

export type StepAddressCreditReferenceAgencyApiMethod =
  (typeof StepAddressCreditReferenceAgencyApiMethod)[keyof typeof StepAddressCreditReferenceAgencyApiMethod];

export const stepAddressCreditReferenceAgencyApiMethod =
  core.cast.identity<StepAddressCreditReferenceAgencyApiMethod>();
