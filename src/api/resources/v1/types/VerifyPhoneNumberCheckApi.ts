import * as core from '../../../../core';
import {
  VerifyPhoneNumberCheckApiStep,
  verifyPhoneNumberCheckApiStep,
} from './VerifyPhoneNumberCheckApiStep';
import { StepStatusApi, stepStatusApi } from './StepStatusApi';
import {
  VerifyPhoneNumberCheckApiValidations,
  verifyPhoneNumberCheckApiValidations,
  verifyPhoneNumberCheckApiValidationsRequest,
  verifyPhoneNumberCheckApiValidationsResponse,
} from './VerifyPhoneNumberCheckApiValidations';
import { VerifyPhoneNumberCheckApiValidationsPhoneVerified } from './VerifyPhoneNumberCheckApiValidationsPhoneVerified';
import { VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus } from './VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus';

export interface VerifyPhoneNumberCheckApi {
  /** A phone number verification (in progress or confirmed), if configured. */
  step: VerifyPhoneNumberCheckApiStep;
  outcome: StepStatusApi;
  /** Validations performed on the phone number. */
  validations: VerifyPhoneNumberCheckApiValidations;
}

export namespace VerifyPhoneNumberCheckApi {
  export type Step = VerifyPhoneNumberCheckApiStep;
  export const Step = VerifyPhoneNumberCheckApiStep;
  export interface Validations {
    phone_verified?: VerifyPhoneNumberCheckApiValidations['phone_verified'];
  }
  export namespace Validations {
    export interface PhoneVerified {
      verified_at: VerifyPhoneNumberCheckApiValidationsPhoneVerified['verified_at'];
      status: VerifyPhoneNumberCheckApiValidationsPhoneVerified['status'];
    }
    export namespace PhoneVerified {
      export type Status = VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
      export const Status = VerifyPhoneNumberCheckApiValidationsPhoneVerifiedStatus;
    }
  }
}

/**
 * Cast schema for the VerifyPhoneNumberCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verifyPhoneNumberCheckApi = core.cast.identity<VerifyPhoneNumberCheckApi>();

/**
 * Cast schema for mapping API responses to the VerifyPhoneNumberCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verifyPhoneNumberCheckApiResponse = core.cast.object(
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
          : verifyPhoneNumberCheckApiValidationsResponse.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'validations'],
);

/**
 * Cast schema for mapping the VerifyPhoneNumberCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verifyPhoneNumberCheckApiRequest = core.cast.object(
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
          : verifyPhoneNumberCheckApiValidationsRequest.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'validations'],
);
