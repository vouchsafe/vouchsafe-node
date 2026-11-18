import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';
import {
  RadarCheckApiDetailsValidationsNoKnownFraudsterMatch,
  radarCheckApiDetailsValidationsNoKnownFraudsterMatch,
  radarCheckApiDetailsValidationsNoKnownFraudsterMatchRequest,
  radarCheckApiDetailsValidationsNoKnownFraudsterMatchResponse,
} from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatch';
import { RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus } from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus';

export interface RadarCheckApiDetailsValidations {
  not_disposable_email?: ValidationOutcomeApi;
  /** Whether the identity matches any known fraudster records. */
  no_known_fraudster_match: RadarCheckApiDetailsValidationsNoKnownFraudsterMatch;
  normal_velocity_detected: ValidationOutcomeApi;
}

export namespace RadarCheckApiDetailsValidations {
  export interface NoKnownFraudsterMatch {
    risk: RadarCheckApiDetailsValidationsNoKnownFraudsterMatch['risk'];
    messages: RadarCheckApiDetailsValidationsNoKnownFraudsterMatch['messages'];
    flags: RadarCheckApiDetailsValidationsNoKnownFraudsterMatch['flags'];
    status: RadarCheckApiDetailsValidationsNoKnownFraudsterMatch['status'];
  }
  export namespace NoKnownFraudsterMatch {
    export type Status = RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus;
    export const Status = RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus;
  }
}

/**
 * Cast schema for the RadarCheckApiDetailsValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const radarCheckApiDetailsValidations =
  core.cast.identity<RadarCheckApiDetailsValidations>();

/**
 * Cast schema for mapping API responses to the RadarCheckApiDetailsValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const radarCheckApiDetailsValidationsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'not_disposable_email',
      'no_known_fraudster_match',
      'normal_velocity_detected',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      not_disposable_email:
        raw['not_disposable_email'] == null
          ? raw['not_disposable_email']
          : validationOutcomeApiResponse.parse(raw['not_disposable_email']),
      no_known_fraudster_match:
        raw['no_known_fraudster_match'] == null
          ? raw['no_known_fraudster_match']
          : radarCheckApiDetailsValidationsNoKnownFraudsterMatchResponse.parse(
              raw['no_known_fraudster_match'],
            ),
      normal_velocity_detected:
        raw['normal_velocity_detected'] == null
          ? raw['normal_velocity_detected']
          : validationOutcomeApiResponse.parse(raw['normal_velocity_detected']),
    };
  },
  ['no_known_fraudster_match', 'normal_velocity_detected'],
);

/**
 * Cast schema for mapping the RadarCheckApiDetailsValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const radarCheckApiDetailsValidationsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      not_disposable_email:
        raw['not_disposable_email'] == null
          ? raw['not_disposable_email']
          : validationOutcomeApiRequest.parse(raw['not_disposable_email']),
      no_known_fraudster_match:
        raw['no_known_fraudster_match'] == null
          ? raw['no_known_fraudster_match']
          : radarCheckApiDetailsValidationsNoKnownFraudsterMatchRequest.parse(
              raw['no_known_fraudster_match'],
            ),
      normal_velocity_detected:
        raw['normal_velocity_detected'] == null
          ? raw['normal_velocity_detected']
          : validationOutcomeApiRequest.parse(raw['normal_velocity_detected']),
    };
  },
  ['no_known_fraudster_match', 'normal_velocity_detected'],
);
