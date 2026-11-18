import * as core from '../../../../core';

export const FailedReasonDocumentCornersNotDetected = {
  DocumentCornersNotDetected: 'DOCUMENT_CORNERS_NOT_DETECTED',
} as const;

export type FailedReasonDocumentCornersNotDetected =
  (typeof FailedReasonDocumentCornersNotDetected)[keyof typeof FailedReasonDocumentCornersNotDetected];

export const failedReasonDocumentCornersNotDetected =
  core.cast.identity<FailedReasonDocumentCornersNotDetected>();
