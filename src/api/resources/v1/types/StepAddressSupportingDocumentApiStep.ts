import * as core from '../../../../core';

export const StepAddressSupportingDocumentApiStep = {
  StepAddress: 'step_address',
} as const;

export type StepAddressSupportingDocumentApiStep =
  (typeof StepAddressSupportingDocumentApiStep)[keyof typeof StepAddressSupportingDocumentApiStep];

export const stepAddressSupportingDocumentApiStep =
  core.cast.identity<StepAddressSupportingDocumentApiStep>();
