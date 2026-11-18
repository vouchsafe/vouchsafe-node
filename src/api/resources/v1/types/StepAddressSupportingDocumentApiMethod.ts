import * as core from '../../../../core';

export const StepAddressSupportingDocumentApiMethod = {
  SupportingDocument: 'supporting_document',
} as const;

export type StepAddressSupportingDocumentApiMethod =
  (typeof StepAddressSupportingDocumentApiMethod)[keyof typeof StepAddressSupportingDocumentApiMethod];

export const stepAddressSupportingDocumentApiMethod =
  core.cast.identity<StepAddressSupportingDocumentApiMethod>();
