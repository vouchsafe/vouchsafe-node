import * as core from '../../../../core';

export const RightToRentInputPayloadRole = {
  Agent: 'Agent',
  Landlord: 'Landlord',
} as const;

export type RightToRentInputPayloadRole =
  (typeof RightToRentInputPayloadRole)[keyof typeof RightToRentInputPayloadRole];

export const rightToRentInputPayloadRole = core.cast.identity<RightToRentInputPayloadRole>();
