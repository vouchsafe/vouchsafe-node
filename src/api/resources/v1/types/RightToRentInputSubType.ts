import * as core from '../../../../core';

export const RightToRentInputSubType = {
  RightToRent: 'RightToRent',
} as const;

export type RightToRentInputSubType =
  (typeof RightToRentInputSubType)[keyof typeof RightToRentInputSubType];

export const rightToRentInputSubType = core.cast.identity<RightToRentInputSubType>();
