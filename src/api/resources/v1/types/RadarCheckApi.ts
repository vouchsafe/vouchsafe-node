import * as core from '../../../../core';
import { RadarCheckKindApi, radarCheckKindApi } from './RadarCheckKindApi';
import { EnrichmentStatusApi, enrichmentStatusApi } from './EnrichmentStatusApi';
import {
  RadarCheckApiDetails,
  radarCheckApiDetails,
  radarCheckApiDetailsRequest,
  radarCheckApiDetailsResponse,
} from './RadarCheckApiDetails';
import { RadarCheckApiDetailsValidations } from './RadarCheckApiDetailsValidations';
import { RadarCheckApiDetailsValidationsNoKnownFraudsterMatch } from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatch';
import { RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus } from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus';

export interface RadarCheckApi {
  check: RadarCheckKindApi;
  outcome: EnrichmentStatusApi;
  details: RadarCheckApiDetails;
}

export namespace RadarCheckApi {
  export interface Details {
    validations: RadarCheckApiDetails['validations'];
  }
  export namespace Details {
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
}

/**
 * Cast schema for the RadarCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const radarCheckApi = core.cast.identity<RadarCheckApi>();

/**
 * Cast schema for mapping API responses to the RadarCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const radarCheckApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['check', 'outcome', 'details']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      check: raw['check'],
      outcome: raw['outcome'],
      details:
        raw['details'] == null
          ? raw['details']
          : radarCheckApiDetailsResponse.parse(raw['details']),
    };
  },
  ['check', 'outcome', 'details'],
);

/**
 * Cast schema for mapping the RadarCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const radarCheckApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      check: raw['check'],
      outcome: raw['outcome'],
      details:
        raw['details'] == null ? raw['details'] : radarCheckApiDetailsRequest.parse(raw['details']),
    };
  },
  ['check', 'outcome', 'details'],
);
