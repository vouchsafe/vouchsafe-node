import * as core from '../../../../core';

export const VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus = {
  Pass: 'pass',
} as const;

export type VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus =
  (typeof VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus)[keyof typeof VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus];

export const verifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus =
  core.cast.identity<VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus>();
