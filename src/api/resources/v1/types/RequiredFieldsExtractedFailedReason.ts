import * as core from '../../../../core';

export const RequiredFieldsExtractedFailedReason = {
  PartialExtraction: 'PARTIAL_EXTRACTION',
} as const;

export type RequiredFieldsExtractedFailedReason =
  (typeof RequiredFieldsExtractedFailedReason)[keyof typeof RequiredFieldsExtractedFailedReason];

export const requiredFieldsExtractedFailedReason =
  core.cast.identity<RequiredFieldsExtractedFailedReason>();
