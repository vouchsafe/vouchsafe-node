import * as core from '../../../../core';

export const FailedReasonDocumentLooksLikePrintCopy = {
  DocumentLooksLikePrintCopy: 'DOCUMENT_LOOKS_LIKE_PRINT_COPY',
} as const;

export type FailedReasonDocumentLooksLikePrintCopy =
  (typeof FailedReasonDocumentLooksLikePrintCopy)[keyof typeof FailedReasonDocumentLooksLikePrintCopy];

export const failedReasonDocumentLooksLikePrintCopy =
  core.cast.identity<FailedReasonDocumentLooksLikePrintCopy>();
