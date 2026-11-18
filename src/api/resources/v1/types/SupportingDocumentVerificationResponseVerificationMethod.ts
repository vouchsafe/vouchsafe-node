import * as core from '../../../../core';

export const SupportingDocumentVerificationResponseVerificationMethod = {
  SupportingDocument: 'supporting_document',
} as const;

export type SupportingDocumentVerificationResponseVerificationMethod =
  (typeof SupportingDocumentVerificationResponseVerificationMethod)[keyof typeof SupportingDocumentVerificationResponseVerificationMethod];

export const supportingDocumentVerificationResponseVerificationMethod =
  core.cast.identity<SupportingDocumentVerificationResponseVerificationMethod>();
