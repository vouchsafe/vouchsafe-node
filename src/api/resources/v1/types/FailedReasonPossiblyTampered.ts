import * as core from '../../../../core';

export const FailedReasonPossiblyTampered = {
  PossiblyTampered: 'POSSIBLY_TAMPERED',
} as const;

export type FailedReasonPossiblyTampered =
  (typeof FailedReasonPossiblyTampered)[keyof typeof FailedReasonPossiblyTampered];

export const failedReasonPossiblyTampered = core.cast.identity<FailedReasonPossiblyTampered>();
