import * as core from '../../../../core';

export const EvisaRequiredFieldsExtractedFailedReason = {
  ShareCodeError: 'SHARE_CODE_ERROR',
  IncorrectDetails: 'INCORRECT_DETAILS',
} as const;

export type EvisaRequiredFieldsExtractedFailedReason =
  (typeof EvisaRequiredFieldsExtractedFailedReason)[keyof typeof EvisaRequiredFieldsExtractedFailedReason];

export const evisaRequiredFieldsExtractedFailedReason =
  core.cast.identity<EvisaRequiredFieldsExtractedFailedReason>();
