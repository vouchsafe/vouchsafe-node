import * as core from '../../../../core';

export const CategoryMatchFailedReason = {
  LowDocTypeMatch: 'LOW_DOC_TYPE_MATCH',
} as const;

export type CategoryMatchFailedReason =
  (typeof CategoryMatchFailedReason)[keyof typeof CategoryMatchFailedReason];

export const categoryMatchFailedReason = core.cast.identity<CategoryMatchFailedReason>();
