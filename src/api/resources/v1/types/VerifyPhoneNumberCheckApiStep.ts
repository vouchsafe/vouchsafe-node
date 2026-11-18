import * as core from '../../../../core';

export const VerifyPhoneNumberCheckApiStep = {
  VerifyPhoneNumber: 'verify_phone_number',
} as const;

export type VerifyPhoneNumberCheckApiStep =
  (typeof VerifyPhoneNumberCheckApiStep)[keyof typeof VerifyPhoneNumberCheckApiStep];

export const verifyPhoneNumberCheckApiStep = core.cast.identity<VerifyPhoneNumberCheckApiStep>();
