import * as core from '../../../../core';

export const PhotoIdEvidenceItemApiOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type PhotoIdEvidenceItemApiOutcome =
  (typeof PhotoIdEvidenceItemApiOutcome)[keyof typeof PhotoIdEvidenceItemApiOutcome];

export const photoIdEvidenceItemApiOutcome = core.cast.identity<PhotoIdEvidenceItemApiOutcome>();
