import * as core from '../../../../core';

export const FailedReasonDocumentColorProfileChanged = {
  DocumentColorProfileChanged: 'DOCUMENT_COLOR_PROFILE_CHANGED',
} as const;

export type FailedReasonDocumentColorProfileChanged =
  (typeof FailedReasonDocumentColorProfileChanged)[keyof typeof FailedReasonDocumentColorProfileChanged];

export const failedReasonDocumentColorProfileChanged =
  core.cast.identity<FailedReasonDocumentColorProfileChanged>();
