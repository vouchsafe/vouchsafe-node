import * as core from '../../../../core';

export const RadarCheckKindApi = {
  Radar: 'radar',
} as const;

export type RadarCheckKindApi = (typeof RadarCheckKindApi)[keyof typeof RadarCheckKindApi];

export const radarCheckKindApi = core.cast.identity<RadarCheckKindApi>();
