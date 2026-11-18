import * as core from '../../../../core';

export const Reason = {
  InvalidPostcode: 'INVALID_POSTCODE',
  InvalidAddress: 'INVALID_ADDRESS',
  MedMatchPersonAtAddress: 'MED_MATCH_PERSON_AT_ADDRESS',
  LowMatchPersonAtAddress: 'LOW_MATCH_PERSON_AT_ADDRESS',
  PartialAddressMatch: 'PARTIAL_ADDRESS_MATCH',
  WeakIdentityWithFullAddress: 'WEAK_IDENTITY_WITH_FULL_ADDRESS',
  DobNotMatched: 'DOB_NOT_MATCHED',
  DobFuzzyMatch: 'DOB_FUZZY_MATCH',
  NoDobData: 'NO_DOB_DATA',
  NoIdentityMatch: 'NO_IDENTITY_MATCH',
  NoResidencyMatch: 'NO_RESIDENCY_MATCH',
  InvalidPhoneFormat: 'INVALID_PHONE_FORMAT',
} as const;

export type Reason = (typeof Reason)[keyof typeof Reason];

export const reason = core.cast.identity<Reason>();
