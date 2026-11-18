import * as core from '../../../../core';

export const EvisaEvidenceItemApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type EvisaEvidenceItemApiOutcome =
  (typeof EvisaEvidenceItemApiOutcome)[keyof typeof EvisaEvidenceItemApiOutcome];

export const evisaEvidenceItemApiOutcome = core.cast.identity<EvisaEvidenceItemApiOutcome>();
