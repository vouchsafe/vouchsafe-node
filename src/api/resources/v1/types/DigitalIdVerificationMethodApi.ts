import * as core from '../../../../core';

export const DigitalIdVerificationMethodApi = {
  SwedenBankId: 'sweden_bank_id',
  OneId: 'one_id',
  Yoti: 'yoti',
  NigeriaNinLookup: 'nigeria_nin_lookup',
  UkImmigrationStatusEvisa: 'uk_immigration_status_evisa',
  UkRightToRentEvisa: 'uk_right_to_rent_evisa',
  UkRightToWorkEvisa: 'uk_right_to_work_evisa',
} as const;

export type DigitalIdVerificationMethodApi =
  (typeof DigitalIdVerificationMethodApi)[keyof typeof DigitalIdVerificationMethodApi];

export const digitalIdVerificationMethodApi = core.cast.identity<DigitalIdVerificationMethodApi>();
