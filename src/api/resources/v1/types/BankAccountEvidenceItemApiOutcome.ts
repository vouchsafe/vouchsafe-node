import * as core from '../../../../core';

export const BankAccountEvidenceItemApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type BankAccountEvidenceItemApiOutcome =
  (typeof BankAccountEvidenceItemApiOutcome)[keyof typeof BankAccountEvidenceItemApiOutcome];

export const bankAccountEvidenceItemApiOutcome =
  core.cast.identity<BankAccountEvidenceItemApiOutcome>();
