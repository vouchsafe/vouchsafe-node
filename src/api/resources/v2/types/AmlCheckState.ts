import * as core from '../../../../core';

export const AmlCheckState = {
  Pass: 'PASS',
  Fail: 'FAIL',
  Inconclusive: 'INCONCLUSIVE',
  Partial: 'PARTIAL',
  NotPerformed: 'NOT_PERFORMED',
} as const;

export type AmlCheckState = (typeof AmlCheckState)[keyof typeof AmlCheckState];

export const amlCheckState = core.cast.identity<AmlCheckState>();
