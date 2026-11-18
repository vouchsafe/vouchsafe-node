import * as core from '../../../../core';

export const AdverseMediaRiskReportState2 = {
  NotPerformed: 'NOT_PERFORMED',
} as const;

export type AdverseMediaRiskReportState2 =
  (typeof AdverseMediaRiskReportState2)[keyof typeof AdverseMediaRiskReportState2];

export const adverseMediaRiskReportState2 = core.cast.identity<AdverseMediaRiskReportState2>();
