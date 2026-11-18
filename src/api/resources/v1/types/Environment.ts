import * as core from '../../../../core';

export const Environment = {
  Production: 'production',
  Sandbox: 'sandbox',
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];

export const environment = core.cast.identity<Environment>();
