import * as core from '../../../../core';

export const VerifyEmailCheckApiStep = {
  VerifyEmail: 'verify_email',
} as const;

export type VerifyEmailCheckApiStep =
  (typeof VerifyEmailCheckApiStep)[keyof typeof VerifyEmailCheckApiStep];

export const verifyEmailCheckApiStep = core.cast.identity<VerifyEmailCheckApiStep>();
