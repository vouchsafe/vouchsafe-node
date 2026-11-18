import * as core from '../../../../core';

export const RightToWorkInputSubType = {
  RightToWork: 'RightToWork',
} as const;

export type RightToWorkInputSubType =
  (typeof RightToWorkInputSubType)[keyof typeof RightToWorkInputSubType];

export const rightToWorkInputSubType = core.cast.identity<RightToWorkInputSubType>();
