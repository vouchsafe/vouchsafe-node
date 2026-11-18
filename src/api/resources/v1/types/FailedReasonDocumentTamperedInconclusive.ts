import * as core from '../../../../core';

export const FailedReasonDocumentTamperedInconclusive = {
  DocumentTamperedInconclusive: 'DOCUMENT_TAMPERED_INCONCLUSIVE',
} as const;

export type FailedReasonDocumentTamperedInconclusive =
  (typeof FailedReasonDocumentTamperedInconclusive)[keyof typeof FailedReasonDocumentTamperedInconclusive];

export const failedReasonDocumentTamperedInconclusive =
  core.cast.identity<FailedReasonDocumentTamperedInconclusive>();
