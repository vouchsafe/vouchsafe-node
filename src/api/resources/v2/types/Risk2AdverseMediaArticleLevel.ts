import * as core from '../../../../core';

export const Risk2AdverseMediaArticleLevel = {
  Pass: 'PASS',
  Review: 'REVIEW',
  Fail: 'FAIL',
} as const;

export type Risk2AdverseMediaArticleLevel =
  (typeof Risk2AdverseMediaArticleLevel)[keyof typeof Risk2AdverseMediaArticleLevel];

export const risk2AdverseMediaArticleLevel = core.cast.identity<Risk2AdverseMediaArticleLevel>();
