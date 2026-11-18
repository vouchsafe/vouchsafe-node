import * as core from '../../../../core';

export const SupportingDocumentEvidenceItemApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type SupportingDocumentEvidenceItemApiOutcome =
  (typeof SupportingDocumentEvidenceItemApiOutcome)[keyof typeof SupportingDocumentEvidenceItemApiOutcome];

export const supportingDocumentEvidenceItemApiOutcome =
  core.cast.identity<SupportingDocumentEvidenceItemApiOutcome>();
