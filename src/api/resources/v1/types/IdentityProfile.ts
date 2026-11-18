import * as core from '../../../../core';

export const IdentityProfile = {
  M1A: 'M1A',
  M2C: 'M2C',
} as const;

export type IdentityProfile = (typeof IdentityProfile)[keyof typeof IdentityProfile];

export const identityProfile = core.cast.identity<IdentityProfile>();
