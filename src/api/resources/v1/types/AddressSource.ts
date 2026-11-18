import * as core from '../../../../core';

export const AddressSource = {
  DigitalId: 'digital_id',
  ManualEntry: 'manual_entry',
  ClaimsToVerify: 'claims_to_verify',
} as const;

export type AddressSource = (typeof AddressSource)[keyof typeof AddressSource];

export const addressSource = core.cast.identity<AddressSource>();
