import * as core from '../../../../core';
import {
  AlertMatchResponse,
  alertMatchResponse,
  alertMatchResponseRequest,
  alertMatchResponseResponse,
} from './AlertMatchResponse';

export interface AmlAlertResponse {
  id: string;
  created_at: string;
  acknowledged_at: string | null;
  matches: AlertMatchResponse[];
}

/**
 * Cast schema for the AmlAlertResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlAlertResponse = core.cast.identity<AmlAlertResponse>();

/**
 * Cast schema for mapping API responses to the AmlAlertResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlAlertResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['id', 'created_at', 'acknowledged_at', 'matches']);
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
      matches: Array.isArray(raw['matches'])
        ? (raw['matches'] as any[]).map((v: any) =>
            v == null ? v : alertMatchResponseResponse.parse(v),
          )
        : (raw['matches'] as any),
    };
  },
  ['id', 'created_at', 'acknowledged_at', 'matches'],
);

/**
 * Cast schema for mapping the AmlAlertResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlAlertResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      created_at: raw['created_at'],
      acknowledged_at: raw['acknowledged_at'],
      matches: Array.isArray(raw['matches'])
        ? (raw['matches'] as any[]).map((v: any) =>
            v == null ? v : alertMatchResponseRequest.parse(v),
          )
        : (raw['matches'] as any),
    };
  },
  ['id', 'created_at', 'acknowledged_at', 'matches'],
);
