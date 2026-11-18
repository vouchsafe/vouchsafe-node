import * as core from '../../../../core';

export const FraudBlocklistAlertResponseMatchedOnItem = {
  Email: 'email',
  Face: 'face',
} as const;

export type FraudBlocklistAlertResponseMatchedOnItem =
  (typeof FraudBlocklistAlertResponseMatchedOnItem)[keyof typeof FraudBlocklistAlertResponseMatchedOnItem];

export const fraudBlocklistAlertResponseMatchedOnItem =
  core.cast.identity<FraudBlocklistAlertResponseMatchedOnItem>();
