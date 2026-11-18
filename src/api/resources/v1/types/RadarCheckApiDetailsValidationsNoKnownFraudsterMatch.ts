import * as core from '../../../../core';
import { RiskApi, riskApi } from './RiskApi';
import { MatchedFraudsterFlagApi, matchedFraudsterFlagApi } from './MatchedFraudsterFlagApi';
import {
  RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus,
  radarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus,
} from './RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus';

/**
 * Whether the identity matches any known fraudster records.
 */
export interface RadarCheckApiDetailsValidationsNoKnownFraudsterMatch {
  risk: RiskApi | null;
  /** Human-readable descriptions for each matched flag. */
  messages: string[];
  /** Fraudster flags that were matched. Empty when the check passed. */
  flags: MatchedFraudsterFlagApi[];
  status: RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus;
}

export namespace RadarCheckApiDetailsValidationsNoKnownFraudsterMatch {
  export type Status = RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus;
  export const Status = RadarCheckApiDetailsValidationsNoKnownFraudsterMatchStatus;
}

/**
 * Cast schema for the RadarCheckApiDetailsValidationsNoKnownFraudsterMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const radarCheckApiDetailsValidationsNoKnownFraudsterMatch =
  core.cast.identity<RadarCheckApiDetailsValidationsNoKnownFraudsterMatch>();

/**
 * Cast schema for mapping API responses to the RadarCheckApiDetailsValidationsNoKnownFraudsterMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const radarCheckApiDetailsValidationsNoKnownFraudsterMatchResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['risk', 'messages', 'flags', 'status']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      risk: raw['risk'],
      messages: raw['messages'],
      flags: raw['flags'],
      status: raw['status'],
    };
  },
  ['risk', 'messages', 'flags', 'status'],
);

/**
 * Cast schema for mapping the RadarCheckApiDetailsValidationsNoKnownFraudsterMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const radarCheckApiDetailsValidationsNoKnownFraudsterMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      risk: raw['risk'],
      messages: raw['messages'],
      flags: raw['flags'],
      status: raw['status'],
    };
  },
  ['risk', 'messages', 'flags', 'status'],
);
