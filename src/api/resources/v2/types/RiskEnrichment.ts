import * as core from '../../../../core';

export const RiskEnrichment = {
  OfficialRecords: 'OFFICIAL_RECORDS',
  Aml: 'AML',
  OnlineFootprint: 'ONLINE_FOOTPRINT',
  AdverseMedia: 'ADVERSE_MEDIA',
} as const;

export type RiskEnrichment = (typeof RiskEnrichment)[keyof typeof RiskEnrichment];

export const riskEnrichment = core.cast.identity<RiskEnrichment>();
