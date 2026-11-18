import * as core from '../../../../core';
import { VerifyEmailCheckApiStep, verifyEmailCheckApiStep } from './VerifyEmailCheckApiStep';
import { StepStatusApi, stepStatusApi } from './StepStatusApi';
import {
  VerifyEmailCheckApiValidations,
  verifyEmailCheckApiValidations,
  verifyEmailCheckApiValidationsRequest,
  verifyEmailCheckApiValidationsResponse,
} from './VerifyEmailCheckApiValidations';
import { VerifyEmailCheckApiValidationsEmailVerified } from './VerifyEmailCheckApiValidationsEmailVerified';
import { VerifyEmailCheckApiValidationsEmailVerifiedStatus } from './VerifyEmailCheckApiValidationsEmailVerifiedStatus';

export interface VerifyEmailCheckApi {
  /** An email verification (in progress or confirmed), if enabled. */
  step: VerifyEmailCheckApiStep;
  outcome: StepStatusApi;
  /** Validations performed on the email address. */
  validations: VerifyEmailCheckApiValidations;
}

export namespace VerifyEmailCheckApi {
  export type Step = VerifyEmailCheckApiStep;
  export const Step = VerifyEmailCheckApiStep;
  export interface Validations {
    email_verified?: VerifyEmailCheckApiValidations['email_verified'];
  }
  export namespace Validations {
    export interface EmailVerified {
      verified_at: VerifyEmailCheckApiValidationsEmailVerified['verified_at'];
      status: VerifyEmailCheckApiValidationsEmailVerified['status'];
    }
    export namespace EmailVerified {
      export type Status = VerifyEmailCheckApiValidationsEmailVerifiedStatus;
      export const Status = VerifyEmailCheckApiValidationsEmailVerifiedStatus;
    }
  }
}

/**
 * Cast schema for the VerifyEmailCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verifyEmailCheckApi = core.cast.identity<VerifyEmailCheckApi>();

/**
 * Cast schema for mapping API responses to the VerifyEmailCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verifyEmailCheckApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['step', 'outcome', 'validations']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      step: raw['step'],
      outcome: raw['outcome'],
      validations:
        raw['validations'] == null
          ? raw['validations']
          : verifyEmailCheckApiValidationsResponse.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'validations'],
);

/**
 * Cast schema for mapping the VerifyEmailCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verifyEmailCheckApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      validations:
        raw['validations'] == null
          ? raw['validations']
          : verifyEmailCheckApiValidationsRequest.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'validations'],
);
