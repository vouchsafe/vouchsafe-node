import * as core from '../../../../core';

export const FailedReasonPartialExtraction = {
  PartialExtraction: 'PARTIAL_EXTRACTION',
} as const;

export type FailedReasonPartialExtraction =
  (typeof FailedReasonPartialExtraction)[keyof typeof FailedReasonPartialExtraction];

export const failedReasonPartialExtraction = core.cast.identity<FailedReasonPartialExtraction>();
