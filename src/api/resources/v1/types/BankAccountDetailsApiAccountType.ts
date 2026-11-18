import * as core from '../../../../core';

export const BankAccountDetailsApiAccountType = {
  Current: 'current',
  Savings: 'savings',
} as const;

export type BankAccountDetailsApiAccountType =
  (typeof BankAccountDetailsApiAccountType)[keyof typeof BankAccountDetailsApiAccountType];

export const bankAccountDetailsApiAccountType =
  core.cast.identity<BankAccountDetailsApiAccountType>();
