import * as core from '../../../../core';
import { OfaCheckKindApi, ofaCheckKindApi } from './OfaCheckKindApi';
import { EnrichmentStatusApi, enrichmentStatusApi } from './EnrichmentStatusApi';
import {
  OfaCheckApiDetails,
  ofaCheckApiDetails,
  ofaCheckApiDetailsRequest,
  ofaCheckApiDetailsResponse,
} from './OfaCheckApiDetails';
import { OfaCheckApiDetailsSignals } from './OfaCheckApiDetailsSignals';

export interface OfaCheckApi {
  check: OfaCheckKindApi;
  outcome: EnrichmentStatusApi;
  details: OfaCheckApiDetails;
}

export namespace OfaCheckApi {
  export interface Details {
    signals: OfaCheckApiDetails['signals'];
    score: OfaCheckApiDetails['score'];
    threshold: OfaCheckApiDetails['threshold'];
  }
  export namespace Details {
    export interface Signals {
      negative: OfaCheckApiDetailsSignals['negative'];
      positive: OfaCheckApiDetailsSignals['positive'];
    }
  }
}

/**
 * Cast schema for the OfaCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const ofaCheckApi = core.cast.identity<OfaCheckApi>();

/**
 * Cast schema for mapping API responses to the OfaCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const ofaCheckApiResponse = core.cast.object(
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
        raw['details'] == null ? raw['details'] : ofaCheckApiDetailsResponse.parse(raw['details']),
    };
  },
  ['check', 'outcome', 'details'],
);

/**
 * Cast schema for mapping the OfaCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const ofaCheckApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      check: raw['check'],
      outcome: raw['outcome'],
      details:
        raw['details'] == null ? raw['details'] : ofaCheckApiDetailsRequest.parse(raw['details']),
    };
  },
  ['check', 'outcome', 'details'],
);
