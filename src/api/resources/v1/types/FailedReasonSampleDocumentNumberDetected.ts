import * as core from '../../../../core';

export const FailedReasonSampleDocumentNumberDetected = {
  SampleDocumentNumberDetected: 'SAMPLE_DOCUMENT_NUMBER_DETECTED',
} as const;

export type FailedReasonSampleDocumentNumberDetected =
  (typeof FailedReasonSampleDocumentNumberDetected)[keyof typeof FailedReasonSampleDocumentNumberDetected];

export const failedReasonSampleDocumentNumberDetected =
  core.cast.identity<FailedReasonSampleDocumentNumberDetected>();
