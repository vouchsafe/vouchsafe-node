import * as core from '../../../../core';

export const OnlineFootprintCheckState = {
  Pass: 'PASS',
  Fail: 'FAIL',
  Inconclusive: 'INCONCLUSIVE',
  Partial: 'PARTIAL',
  NotPerformed: 'NOT_PERFORMED',
} as const;

export type OnlineFootprintCheckState =
  (typeof OnlineFootprintCheckState)[keyof typeof OnlineFootprintCheckState];

export const onlineFootprintCheckState = core.cast.identity<OnlineFootprintCheckState>();
