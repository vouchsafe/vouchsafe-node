import * as core from '../../../../core';

export const EvisaEvidenceItemApiStep = {
  Evisa: 'evisa',
} as const;

export type EvisaEvidenceItemApiStep =
  (typeof EvisaEvidenceItemApiStep)[keyof typeof EvisaEvidenceItemApiStep];

export const evisaEvidenceItemApiStep = core.cast.identity<EvisaEvidenceItemApiStep>();
