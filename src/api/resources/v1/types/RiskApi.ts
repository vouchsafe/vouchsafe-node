import * as core from '../../../../core';

export const RiskApi = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
} as const;

export type RiskApi = (typeof RiskApi)[keyof typeof RiskApi];

export const riskApi = core.cast.identity<RiskApi>();
