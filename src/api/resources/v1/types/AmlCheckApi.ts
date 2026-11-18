import * as core from '../../../../core';
import { AmlCheckKindApi, amlCheckKindApi } from './AmlCheckKindApi';
import { EnrichmentStatusApi, enrichmentStatusApi } from './EnrichmentStatusApi';
import {
  AmlCheckApiDetails,
  amlCheckApiDetails,
  amlCheckApiDetailsRequest,
  amlCheckApiDetailsResponse,
} from './AmlCheckApiDetails';

export interface AmlCheckApi {
  check: AmlCheckKindApi;
  outcome: EnrichmentStatusApi;
  details: AmlCheckApiDetails;
}

export namespace AmlCheckApi {
  export interface Details {
    matches: AmlCheckApiDetails['matches'];
    threshold: AmlCheckApiDetails['threshold'];
  }
}

/**
 * Cast schema for the AmlCheckApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlCheckApi = core.cast.identity<AmlCheckApi>();

/**
 * Cast schema for mapping API responses to the AmlCheckApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlCheckApiResponse = core.cast.object(
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
        raw['details'] == null ? raw['details'] : amlCheckApiDetailsResponse.parse(raw['details']),
    };
  },
  ['check', 'outcome', 'details'],
);

/**
 * Cast schema for mapping the AmlCheckApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlCheckApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      check: raw['check'],
      outcome: raw['outcome'],
      details:
        raw['details'] == null ? raw['details'] : amlCheckApiDetailsRequest.parse(raw['details']),
    };
  },
  ['check', 'outcome', 'details'],
);
