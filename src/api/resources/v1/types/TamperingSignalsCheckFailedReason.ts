import * as core from '../../../../core';

export const TamperingSignalsCheckFailedReason = {
  PossiblyTampered: 'POSSIBLY_TAMPERED',
} as const;

export type TamperingSignalsCheckFailedReason =
  (typeof TamperingSignalsCheckFailedReason)[keyof typeof TamperingSignalsCheckFailedReason];

export const tamperingSignalsCheckFailedReason =
  core.cast.identity<TamperingSignalsCheckFailedReason>();
