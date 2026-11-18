import * as core from '../../../../core';
import {
  OfaCheckApiDetailsSignals,
  ofaCheckApiDetailsSignals,
  ofaCheckApiDetailsSignalsRequest,
  ofaCheckApiDetailsSignalsResponse,
} from './OfaCheckApiDetailsSignals';

export interface OfaCheckApiDetails {
  signals: OfaCheckApiDetailsSignals;
  /** Footprint score for the supplied contact detail, or null if unavailable. */
  score: number | null;
  /** The minimum score required to pass the footprint check. */
  threshold: number | null;
}

export namespace OfaCheckApiDetails {
  export interface Signals {
    negative: OfaCheckApiDetailsSignals['negative'];
    positive: OfaCheckApiDetailsSignals['positive'];
  }
}

/**
 * Cast schema for the OfaCheckApiDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const ofaCheckApiDetails = core.cast.identity<OfaCheckApiDetails>();

/**
 * Cast schema for mapping API responses to the OfaCheckApiDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const ofaCheckApiDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['signals', 'score', 'threshold']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      signals:
        raw['signals'] == null
          ? raw['signals']
          : ofaCheckApiDetailsSignalsResponse.parse(raw['signals']),
      score: raw['score'],
      threshold: raw['threshold'],
    };
  },
  ['signals', 'score', 'threshold'],
);

/**
 * Cast schema for mapping the OfaCheckApiDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const ofaCheckApiDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      signals:
        raw['signals'] == null
          ? raw['signals']
          : ofaCheckApiDetailsSignalsRequest.parse(raw['signals']),
      score: raw['score'],
      threshold: raw['threshold'],
    };
  },
  ['signals', 'score', 'threshold'],
);
