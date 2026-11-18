import * as core from '../../../../core';

export const SupportingDocumentEvidenceItemApiStep = {
  SupportingDocument: 'supporting_document',
} as const;

export type SupportingDocumentEvidenceItemApiStep =
  (typeof SupportingDocumentEvidenceItemApiStep)[keyof typeof SupportingDocumentEvidenceItemApiStep];

export const supportingDocumentEvidenceItemApiStep =
  core.cast.identity<SupportingDocumentEvidenceItemApiStep>();
