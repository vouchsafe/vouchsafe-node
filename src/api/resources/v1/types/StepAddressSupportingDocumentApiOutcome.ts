import * as core from '../../../../core';

export const StepAddressSupportingDocumentApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type StepAddressSupportingDocumentApiOutcome =
  (typeof StepAddressSupportingDocumentApiOutcome)[keyof typeof StepAddressSupportingDocumentApiOutcome];

export const stepAddressSupportingDocumentApiOutcome =
  core.cast.identity<StepAddressSupportingDocumentApiOutcome>();
