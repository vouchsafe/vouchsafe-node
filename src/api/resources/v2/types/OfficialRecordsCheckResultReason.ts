import * as core from '../../../../core';

export const OfficialRecordsCheckResultReason = {
  NoIdentityMatch: 'NO_IDENTITY_MATCH',
  NoResidencyMatch: 'NO_RESIDENCY_MATCH',
  PartialAddressMatch: 'PARTIAL_ADDRESS_MATCH',
  WeakIdentityWithFullAddress: 'WEAK_IDENTITY_WITH_FULL_ADDRESS',
  DobNotMatched: 'DOB_NOT_MATCHED',
  DobFuzzyMatch: 'DOB_FUZZY_MATCH',
  NoDobData: 'NO_DOB_DATA',
} as const;

export type OfficialRecordsCheckResultReason =
  (typeof OfficialRecordsCheckResultReason)[keyof typeof OfficialRecordsCheckResultReason];

export const officialRecordsCheckResultReason =
  core.cast.identity<OfficialRecordsCheckResultReason>();
