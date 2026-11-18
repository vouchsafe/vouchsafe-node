import * as core from '../../../../core';

export const VerifyEmailCheckApiValidationsEmailVerifiedStatus = {
  Pass: 'pass',
} as const;

export type VerifyEmailCheckApiValidationsEmailVerifiedStatus =
  (typeof VerifyEmailCheckApiValidationsEmailVerifiedStatus)[keyof typeof VerifyEmailCheckApiValidationsEmailVerifiedStatus];

export const verifyEmailCheckApiValidationsEmailVerifiedStatus =
  core.cast.identity<VerifyEmailCheckApiValidationsEmailVerifiedStatus>();
