import * as core from '../../../../core';
import {
  VerifyEmailCheckApiValidationsEmailVerifiedStatus,
  verifyEmailCheckApiValidationsEmailVerifiedStatus,
} from './VerifyEmailCheckApiValidationsEmailVerifiedStatus';

/**
 * Present only when the email address has been verified.
Otherwise undefined.
 */
export interface VerifyEmailCheckApiValidationsEmailVerified {
  /** ISO 8601 timestamp for when the email address was verified. */
  verified_at: string;
  status: VerifyEmailCheckApiValidationsEmailVerifiedStatus;
}

export namespace VerifyEmailCheckApiValidationsEmailVerified {
  export type Status = VerifyEmailCheckApiValidationsEmailVerifiedStatus;
  export const Status = VerifyEmailCheckApiValidationsEmailVerifiedStatus;
}

/**
 * Cast schema for the VerifyEmailCheckApiValidationsEmailVerified model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verifyEmailCheckApiValidationsEmailVerified =
  core.cast.identity<VerifyEmailCheckApiValidationsEmailVerified>();

/**
 * Cast schema for mapping API responses to the VerifyEmailCheckApiValidationsEmailVerified application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verifyEmailCheckApiValidationsEmailVerifiedResponse = core.cast.object(
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
 * Cast schema for mapping the VerifyEmailCheckApiValidationsEmailVerified application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verifyEmailCheckApiValidationsEmailVerifiedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { verified_at: raw['verified_at'], status: raw['status'] };
  },
  ['verified_at', 'status'],
);
