import * as core from '../../../../core';
import {
  RadarCheckApiDetailsValidations,
  radarCheckApiDetailsValidations,
  radarCheckApiDetailsValidationsRequest,
  radarCheckApiDetailsValidationsResponse,
} from './RadarCheckApiDetailsValidations';
import { RadarCheckApiDetailsValidationsNoKnownFraudsterMatch } from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatch';
import { RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus } from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus';

export interface RadarCheckApiDetails {
  validations: RadarCheckApiDetailsValidations;
}

export namespace RadarCheckApiDetails {
  export interface Validations {
    not_disposable_email?: RadarCheckApiDetailsValidations['not_disposable_email'];
    no_known_fraudster_match: RadarCheckApiDetailsValidations['no_known_fraudster_match'];
    normal_velocity_detected: RadarCheckApiDetailsValidations['normal_velocity_detected'];
  }
  export namespace Validations {
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
}

/**
 * Cast schema for the RadarCheckApiDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const radarCheckApiDetails = core.cast.identity<RadarCheckApiDetails>();

/**
 * Cast schema for mapping API responses to the RadarCheckApiDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const radarCheckApiDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['validations']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      validations:
        raw['validations'] == null
          ? raw['validations']
          : radarCheckApiDetailsValidationsResponse.parse(raw['validations']),
    };
  },
  ['validations'],
);

/**
 * Cast schema for mapping the RadarCheckApiDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const radarCheckApiDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      validations:
        raw['validations'] == null
          ? raw['validations']
          : radarCheckApiDetailsValidationsRequest.parse(raw['validations']),
    };
  },
  ['validations'],
);
