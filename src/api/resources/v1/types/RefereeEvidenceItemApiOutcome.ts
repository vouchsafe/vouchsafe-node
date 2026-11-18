import * as core from '../../../../core';

export const RefereeEvidenceItemApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
  InProgress: 'in_progress',
} as const;

export type RefereeEvidenceItemApiOutcome =
  (typeof RefereeEvidenceItemApiOutcome)[keyof typeof RefereeEvidenceItemApiOutcome];

export const refereeEvidenceItemApiOutcome = core.cast.identity<RefereeEvidenceItemApiOutcome>();
