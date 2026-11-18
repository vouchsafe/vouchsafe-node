import * as core from '../../../../core';

export const FailedReasonDocumentTextTampered = {
  DocumentTextTampered: 'DOCUMENT_TEXT_TAMPERED',
} as const;

export type FailedReasonDocumentTextTampered =
  (typeof FailedReasonDocumentTextTampered)[keyof typeof FailedReasonDocumentTextTampered];

export const failedReasonDocumentTextTampered =
  core.cast.identity<FailedReasonDocumentTextTampered>();
