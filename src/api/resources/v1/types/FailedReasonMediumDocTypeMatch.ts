import * as core from '../../../../core';

export const FailedReasonMediumDocTypeMatch = {
  MediumDocTypeMatch: 'MEDIUM_DOC_TYPE_MATCH',
} as const;

export type FailedReasonMediumDocTypeMatch =
  (typeof FailedReasonMediumDocTypeMatch)[keyof typeof FailedReasonMediumDocTypeMatch];

export const failedReasonMediumDocTypeMatch = core.cast.identity<FailedReasonMediumDocTypeMatch>();
