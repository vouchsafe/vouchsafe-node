import * as core from '../../../../core';

export const FailedReasonDocumentIsGrayscale = {
  DocumentIsGrayscale: 'DOCUMENT_IS_GRAYSCALE',
} as const;

export type FailedReasonDocumentIsGrayscale =
  (typeof FailedReasonDocumentIsGrayscale)[keyof typeof FailedReasonDocumentIsGrayscale];

export const failedReasonDocumentIsGrayscale =
  core.cast.identity<FailedReasonDocumentIsGrayscale>();
