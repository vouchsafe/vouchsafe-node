import * as core from '../../../../core';

export const GetRiskResponseEnrichmentsItem = {
  OfficialRecords: 'OFFICIAL_RECORDS',
  CreditBureau: 'CREDIT_BUREAU',
  OnlineFootprint: 'ONLINE_FOOTPRINT',
  Aml: 'AML',
  AdverseMedia: 'ADVERSE_MEDIA',
} as const;

export type GetRiskResponseEnrichmentsItem =
  (typeof GetRiskResponseEnrichmentsItem)[keyof typeof GetRiskResponseEnrichmentsItem];

export const getRiskResponseEnrichmentsItem = core.cast.identity<GetRiskResponseEnrichmentsItem>();
