import * as core from '../../../../core';

export const Risk2AdverseMediaReportState = {
  Pass: 'PASS',
  Review: 'REVIEW',
  Fail: 'FAIL',
  NotPerformed: 'NOT_PERFORMED',
} as const;

export type Risk2AdverseMediaReportState =
  (typeof Risk2AdverseMediaReportState)[keyof typeof Risk2AdverseMediaReportState];

export const risk2AdverseMediaReportState = core.cast.identity<Risk2AdverseMediaReportState>();
