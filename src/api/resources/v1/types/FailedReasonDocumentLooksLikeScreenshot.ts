import * as core from '../../../../core';

export const FailedReasonDocumentLooksLikeScreenshot = {
  DocumentLooksLikeScreenshot: 'DOCUMENT_LOOKS_LIKE_SCREENSHOT',
} as const;

export type FailedReasonDocumentLooksLikeScreenshot =
  (typeof FailedReasonDocumentLooksLikeScreenshot)[keyof typeof FailedReasonDocumentLooksLikeScreenshot];

export const failedReasonDocumentLooksLikeScreenshot =
  core.cast.identity<FailedReasonDocumentLooksLikeScreenshot>();
