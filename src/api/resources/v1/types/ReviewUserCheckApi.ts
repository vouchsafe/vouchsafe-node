import * as core from '../../../../core';
import { ReviewUserCheckApiStep, reviewUserCheckApiStep } from './ReviewUserCheckApiStep';
import { StepStatusApi, stepStatusApi } from './StepStatusApi';
import {
  ReviewUserCheckApiValidations,
  reviewUserCheckApiValidations,
  reviewUserCheckApiValidationsRequest,
  reviewUserCheckApiValidationsResponse,
} from './ReviewUserCheckApiValidations';

export interface ReviewUserCheckApi {
  /** A referee vouch of the user’s claims (in progress or confirmed). */
  step: ReviewUserCheckApiStep;
  outcome: StepStatusApi;
  /** Rejection reason supplied by the referee. Only present in v2 verifications. */
  reason?: string;
  /** Claims being verified by the referee.
All claims "pass" when they accept and proceed, or "fail" when they reject.
Otherwise undefined while they have not made a choice yet. */
  validations: ReviewUserCheckApiValidations;
}

export namespace ReviewUserCheckApi {
  export type Step = ReviewUserCheckApiStep;
  export const Step = ReviewUserCheckApiStep;
  export interface Validations {
    referee_confirmed_photo?: ReviewUserCheckApiValidations['referee_confirmed_photo'];
    referee_confirmed_date_of_birth?: ReviewUserCheckApiValidations['referee_confirmed_date_of_birth'];
    referee_confirmed_name?: ReviewUserCheckApiValidations['referee_confirmed_name'];
  }
}

/**
 * Cast schema for the ReviewUserCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const reviewUserCheckApi = core.cast.identity<ReviewUserCheckApi>();

/**
 * Cast schema for mapping API responses to the ReviewUserCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const reviewUserCheckApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['step', 'outcome', 'reason', 'validations']);
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
      reason: raw['reason'],
      validations:
        raw['validations'] == null
          ? raw['validations']
          : reviewUserCheckApiValidationsResponse.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'validations'],
);

/**
 * Cast schema for mapping the ReviewUserCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const reviewUserCheckApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      reason: raw['reason'],
      validations:
        raw['validations'] == null
          ? raw['validations']
          : reviewUserCheckApiValidationsRequest.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'validations'],
);
