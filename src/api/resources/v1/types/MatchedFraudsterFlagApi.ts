import * as core from '../../../../core';

export const MatchedFraudsterFlagApi = {
  FaceScanBlocked: 'FACE_SCAN_BLOCKED',
  BlockedEmail: 'BLOCKED_EMAIL',
  NameSuspicious: 'NAME_SUSPICIOUS',
  FraudSuspicion: 'FRAUD_SUSPICION',
} as const;

export type MatchedFraudsterFlagApi =
  (typeof MatchedFraudsterFlagApi)[keyof typeof MatchedFraudsterFlagApi];

export const matchedFraudsterFlagApi = core.cast.identity<MatchedFraudsterFlagApi>();
