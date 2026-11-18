import * as core from '../../../../core';

export const FailedReasonDocumentFeatureMissing = {
  DocumentFeatureMissing: 'DOCUMENT_FEATURE_MISSING',
} as const;

export type FailedReasonDocumentFeatureMissing =
  (typeof FailedReasonDocumentFeatureMissing)[keyof typeof FailedReasonDocumentFeatureMissing];

export const failedReasonDocumentFeatureMissing =
  core.cast.identity<FailedReasonDocumentFeatureMissing>();
