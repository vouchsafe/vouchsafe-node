import * as core from '../../../../core';

export const RefereeEvidenceItemApiStep = {
  Vouch: 'vouch',
} as const;

export type RefereeEvidenceItemApiStep =
  (typeof RefereeEvidenceItemApiStep)[keyof typeof RefereeEvidenceItemApiStep];

export const refereeEvidenceItemApiStep = core.cast.identity<RefereeEvidenceItemApiStep>();
