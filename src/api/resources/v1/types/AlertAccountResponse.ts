import * as core from '../../../../core';
import { AlertAccountStatus, alertAccountStatus } from './AlertAccountStatus';

export interface AlertAccountResponse {
  id: string;
  first_name: string | null;
  last_name: string | null;
  alerts_enabled_at: string | null;
  last_screened_at: string | null;
  created_at: string;
  status: AlertAccountStatus;
  risk_type: string | null;
}

/**
 * Cast schema for the AlertAccountResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const alertAccountResponse = core.cast.identity<AlertAccountResponse>();

/**
 * Cast schema for mapping API responses to the AlertAccountResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const alertAccountResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'first_name',
      'last_name',
      'alerts_enabled_at',
      'last_screened_at',
      'created_at',
      'status',
      'risk_type',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      id: raw['id'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      last_screened_at: raw['last_screened_at'],
      created_at: raw['created_at'],
      status: raw['status'],
      risk_type: raw['risk_type'],
    };
  },
  [
    'id',
    'first_name',
    'last_name',
    'alerts_enabled_at',
    'last_screened_at',
    'created_at',
    'status',
    'risk_type',
  ],
);

/**
 * Cast schema for mapping the AlertAccountResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const alertAccountResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      last_screened_at: raw['last_screened_at'],
      created_at: raw['created_at'],
      status: raw['status'],
      risk_type: raw['risk_type'],
    };
  },
  [
    'id',
    'first_name',
    'last_name',
    'alerts_enabled_at',
    'last_screened_at',
    'created_at',
    'status',
    'risk_type',
  ],
);
