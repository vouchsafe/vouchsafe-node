import * as core from '../../../../core';

export const RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus =
  (typeof RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus)[keyof typeof RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus];

export const radarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus =
  core.cast.identity<RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus>();
