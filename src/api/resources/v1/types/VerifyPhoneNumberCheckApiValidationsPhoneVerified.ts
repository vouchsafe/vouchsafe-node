import * as core from '../../../../core';
import {
  VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus,
  verifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus,
} from './VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus';

/**
 * Present only when the phone number has been verified.
Otherwise undefined.
 */
export interface VerifyPhoneNumberCheckApiValidationsPhoneVerified {
  /** ISO 8601 timestamp for when the phone number was verified. */
  verified_at: string;
  status: VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
}

export namespace VerifyPhoneNumberCheckApiValidationsPhoneVerified {
  export type Status = VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
  export const Status = VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
}

/**
 * Cast schema for the VerifyPhoneNumberCheckApiValidationsPhoneVerified model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verifyPhoneNumberCheckApiValidationsPhoneVerified =
  core.cast.identity<VerifyPhoneNumberCheckApiValidationsPhoneVerified>();

/**
 * Cast schema for mapping API responses to the VerifyPhoneNumberCheckApiValidationsPhoneVerified application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verifyPhoneNumberCheckApiValidationsPhoneVerifiedResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['verified_at', 'status']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, verified_at: raw['verified_at'], status: raw['status'] };
  },
  ['verified_at', 'status'],
);

/**
 * Cast schema for mapping the VerifyPhoneNumberCheckApiValidationsPhoneVerified application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verifyPhoneNumberCheckApiValidationsPhoneVerifiedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { verified_at: raw['verified_at'], status: raw['status'] };
  },
  ['verified_at', 'status'],
);
