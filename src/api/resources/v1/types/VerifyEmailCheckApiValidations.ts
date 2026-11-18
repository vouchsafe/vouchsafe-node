import * as core from '../../../../core';
import {
  VerifyEmailCheckApiValidationsEmailVerified,
  verifyEmailCheckApiValidationsEmailVerified,
  verifyEmailCheckApiValidationsEmailVerifiedRequest,
  verifyEmailCheckApiValidationsEmailVerifiedResponse,
} from './VerifyEmailCheckApiValidationsEmailVerified';
import { VerifyEmailCheckApiValidationsEmailVerifiedStatus } from './VerifyEmailCheckApiValidationsEmailVerifiedStatus';

/**
 * Validations performed on the email address.
 */
export interface VerifyEmailCheckApiValidations {
  /** Present only when the email address has been verified.
Otherwise undefined. */
  email_verified?: VerifyEmailCheckApiValidationsEmailVerified;
}

export namespace VerifyEmailCheckApiValidations {
  export interface EmailVerified {
    verified_at: VerifyEmailCheckApiValidationsEmailVerified['verified_at'];
    status: VerifyEmailCheckApiValidationsEmailVerified['status'];
  }
  export namespace EmailVerified {
    export type Status = VerifyEmailCheckApiValidationsEmailVerifiedStatus;
    export const Status = VerifyEmailCheckApiValidationsEmailVerifiedStatus;
  }
}

/**
 * Cast schema for the VerifyEmailCheckApiValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verifyEmailCheckApiValidations = core.cast.identity<VerifyEmailCheckApiValidations>();

/**
 * Cast schema for mapping API responses to the VerifyEmailCheckApiValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verifyEmailCheckApiValidationsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['email_verified']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    email_verified:
      raw['email_verified'] == null
        ? raw['email_verified']
        : verifyEmailCheckApiValidationsEmailVerifiedResponse.parse(raw['email_verified']),
  };
}, []);

/**
 * Cast schema for mapping the VerifyEmailCheckApiValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verifyEmailCheckApiValidationsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    email_verified:
      raw['email_verified'] == null
        ? raw['email_verified']
        : verifyEmailCheckApiValidationsEmailVerifiedRequest.parse(raw['email_verified']),
  };
}, []);
