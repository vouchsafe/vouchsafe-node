import * as core from '../../../../core';

export const FailedReasonInvalidDocumentDateFormat = {
  InvalidDocumentDateFormat: 'INVALID_DOCUMENT_DATE_FORMAT',
} as const;

export type FailedReasonInvalidDocumentDateFormat =
  (typeof FailedReasonInvalidDocumentDateFormat)[keyof typeof FailedReasonInvalidDocumentDateFormat];

export const failedReasonInvalidDocumentDateFormat =
  core.cast.identity<FailedReasonInvalidDocumentDateFormat>();
