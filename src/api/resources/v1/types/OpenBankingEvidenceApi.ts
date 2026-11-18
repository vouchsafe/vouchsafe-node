import * as core from '../../../../core';

export const OpenBankingEvidenceApi = {
  OpenBanking: 'open_banking',
} as const;

export type OpenBankingEvidenceApi =
  (typeof OpenBankingEvidenceApi)[keyof typeof OpenBankingEvidenceApi];

export const openBankingEvidenceApi = core.cast.identity<OpenBankingEvidenceApi>();
