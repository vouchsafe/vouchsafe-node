import * as core from '../../../../core';

export const AdverseMediaOutcome = {
  Pass: 'PASS',
  Review: 'REVIEW',
  Fail: 'FAIL',
} as const;

export type AdverseMediaOutcome = (typeof AdverseMediaOutcome)[keyof typeof AdverseMediaOutcome];

export const adverseMediaOutcome = core.cast.identity<AdverseMediaOutcome>();
