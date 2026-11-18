import * as core from '../../../../core';
import {
  FraudBlocklistAlertResponseMatchedOnItem,
  fraudBlocklistAlertResponseMatchedOnItem,
} from './FraudBlocklistAlertResponseMatchedOnItem';
import { FraudBlocklistAlertResponseMatchedOn } from '../../../types/FraudBlocklistAlertResponseMatchedOn';

export interface FraudBlocklistAlertResponse {
  id: string;
  created_at: string;
  acknowledged_at: string | null;
  matched_on: FraudBlocklistAlertResponseMatchedOnItem[];
}

export namespace FraudBlocklistAlertResponse {
  export type MatchedOn = FraudBlocklistAlertResponseMatchedOn;
  export namespace MatchedOn {
    export type Item = FraudBlocklistAlertResponseMatchedOnItem;
    export const Item = FraudBlocklistAlertResponseMatchedOnItem;
  }
}

/**
 * Cast schema for the FraudBlocklistAlertResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const fraudBlocklistAlertResponse = core.cast.identity<FraudBlocklistAlertResponse>();

/**
 * Cast schema for mapping API responses to the FraudBlocklistAlertResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const fraudBlocklistAlertResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['id', 'created_at', 'acknowledged_at', 'matched_on']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      id: raw['id'],
      created_at: raw['created_at'],
      acknowledged_at: raw['acknowledged_at'],
      matched_on: raw['matched_on'],
    };
  },
  ['id', 'created_at', 'acknowledged_at', 'matched_on'],
);

/**
 * Cast schema for mapping the FraudBlocklistAlertResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const fraudBlocklistAlertResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      created_at: raw['created_at'],
      acknowledged_at: raw['acknowledged_at'],
      matched_on: raw['matched_on'],
    };
  },
  ['id', 'created_at', 'acknowledged_at', 'matched_on'],
);
