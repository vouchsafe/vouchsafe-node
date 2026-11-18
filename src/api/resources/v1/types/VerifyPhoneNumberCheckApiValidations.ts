import * as core from '../../../../core';
import {
  VerifyPhoneNumberCheckApiValidationsPhoneVerified,
  verifyPhoneNumberCheckApiValidationsPhoneVerified,
  verifyPhoneNumberCheckApiValidationsPhoneVerifiedRequest,
  verifyPhoneNumberCheckApiValidationsPhoneVerifiedResponse,
} from './VerifyPhoneNumberCheckApiValidationsPhoneVerified';
import { VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus } from './VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus';

/**
 * Validations performed on the phone number.
 */
export interface VerifyPhoneNumberCheckApiValidations {
  /** Present only when the phone number has been verified.
Otherwise undefined. */
  phone_verified?: VerifyPhoneNumberCheckApiValidationsPhoneVerified;
}

export namespace VerifyPhoneNumberCheckApiValidations {
  export interface PhoneVerified {
    verified_at: VerifyPhoneNumberCheckApiValidationsPhoneVerified['verified_at'];
    status: VerifyPhoneNumberCheckApiValidationsPhoneVerified['status'];
  }
  export namespace PhoneVerified {
    export type Status = VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
    export const Status = VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
  }
}

/**
 * Cast schema for the VerifyPhoneNumberCheckApiValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verifyPhoneNumberCheckApiValidations =
  core.cast.identity<VerifyPhoneNumberCheckApiValidations>();

/**
 * Cast schema for mapping API responses to the VerifyPhoneNumberCheckApiValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verifyPhoneNumberCheckApiValidationsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['phone_verified']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    phone_verified:
      raw['phone_verified'] == null
        ? raw['phone_verified']
        : verifyPhoneNumberCheckApiValidationsPhoneVerifiedResponse.parse(raw['phone_verified']),
  };
}, []);

/**
 * Cast schema for mapping the VerifyPhoneNumberCheckApiValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verifyPhoneNumberCheckApiValidationsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    phone_verified:
      raw['phone_verified'] == null
        ? raw['phone_verified']
        : verifyPhoneNumberCheckApiValidationsPhoneVerifiedRequest.parse(raw['phone_verified']),
  };
}, []);
