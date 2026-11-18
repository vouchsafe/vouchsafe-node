import * as core from '../../../../core';

export const OfficialRecordsCheckState = {
  Pass: 'PASS',
  Fail: 'FAIL',
  Inconclusive: 'INCONCLUSIVE',
  Partial: 'PARTIAL',
  NotPerformed: 'NOT_PERFORMED',
} as const;

export type OfficialRecordsCheckState =
  (typeof OfficialRecordsCheckState)[keyof typeof OfficialRecordsCheckState];

export const officialRecordsCheckState = core.cast.identity<OfficialRecordsCheckState>();
