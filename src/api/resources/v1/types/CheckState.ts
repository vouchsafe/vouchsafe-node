import * as core from '../../../../core';

export const CheckState = {
  Pass: 'PASS',
  Fail: 'FAIL',
  Inconclusive: 'INCONCLUSIVE',
  Partial: 'PARTIAL',
  NotPerformed: 'NOT_PERFORMED',
} as const;

export type CheckState = (typeof CheckState)[keyof typeof CheckState];

export const checkState = core.cast.identity<CheckState>();
