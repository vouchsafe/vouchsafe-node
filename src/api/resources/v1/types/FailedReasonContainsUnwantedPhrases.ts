import * as core from '../../../../core';

export const FailedReasonContainsUnwantedPhrases = {
  ContainsUnwantedPhrases: 'CONTAINS_UNWANTED_PHRASES',
} as const;

export type FailedReasonContainsUnwantedPhrases =
  (typeof FailedReasonContainsUnwantedPhrases)[keyof typeof FailedReasonContainsUnwantedPhrases];

export const failedReasonContainsUnwantedPhrases =
  core.cast.identity<FailedReasonContainsUnwantedPhrases>();
