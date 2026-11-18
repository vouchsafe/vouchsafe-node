import * as core from '../../../../core';

export const ThirtySixEnumsEnvironment = {
  Production: 'production',
  Sandbox: 'sandbox',
} as const;

export type ThirtySixEnumsEnvironment =
  (typeof ThirtySixEnumsEnvironment)[keyof typeof ThirtySixEnumsEnvironment];

export const thirtySixEnumsEnvironment = core.cast.identity<ThirtySixEnumsEnvironment>();
