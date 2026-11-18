import * as core from '../../../../core';

export const GetSmartLookupResponseChecksItem = {
  CreditBureau: 'CreditBureau',
  OnlineFootprint: 'OnlineFootprint',
  Aml: 'AML',
} as const;

export type GetSmartLookupResponseChecksItem =
  (typeof GetSmartLookupResponseChecksItem)[keyof typeof GetSmartLookupResponseChecksItem];

export const getSmartLookupResponseChecksItem =
  core.cast.identity<GetSmartLookupResponseChecksItem>();
