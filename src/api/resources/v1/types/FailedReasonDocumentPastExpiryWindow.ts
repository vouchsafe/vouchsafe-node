import * as core from '../../../../core';

export const FailedReasonDocumentPastExpiryWindow = {
  DocumentPastExpiryWindow: 'DOCUMENT_PAST_EXPIRY_WINDOW',
} as const;

export type FailedReasonDocumentPastExpiryWindow =
  (typeof FailedReasonDocumentPastExpiryWindow)[keyof typeof FailedReasonDocumentPastExpiryWindow];

export const failedReasonDocumentPastExpiryWindow =
  core.cast.identity<FailedReasonDocumentPastExpiryWindow>();
