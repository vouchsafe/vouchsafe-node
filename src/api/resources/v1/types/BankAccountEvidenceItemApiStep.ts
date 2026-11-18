import * as core from '../../../../core';

export const BankAccountEvidenceItemApiStep = {
  BankAccount: 'bank_account',
} as const;

export type BankAccountEvidenceItemApiStep =
  (typeof BankAccountEvidenceItemApiStep)[keyof typeof BankAccountEvidenceItemApiStep];

export const bankAccountEvidenceItemApiStep = core.cast.identity<BankAccountEvidenceItemApiStep>();
