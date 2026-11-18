import * as core from '../../../../../../core';

export const SmartLookupInputChecksItem = {
  CreditBureau: 'CreditBureau',
  OnlineFootprint: 'OnlineFootprint',
  Aml: 'AML',
} as const;

export type SmartLookupInputChecksItem =
  (typeof SmartLookupInputChecksItem)[keyof typeof SmartLookupInputChecksItem];

export const smartLookupInputChecksItem = core.cast.identity<SmartLookupInputChecksItem>();
