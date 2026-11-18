import * as core from '../../../../core';
import {
  AlertResponse,
  alertResponse,
  alertResponseRequest,
  alertResponseResponse,
} from './AlertResponse';

export interface AlertAccountDetailResponse {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  date_of_birth: string | null;
  alerts_enabled_at: string | null;
  last_screened_at: string | null;
  created_at: string;
  alerts: AlertResponse[];
}

/**
 * Cast schema for the AlertAccountDetailResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const alertAccountDetailResponse = core.cast.identity<AlertAccountDetailResponse>();

/**
 * Cast schema for mapping API responses to the AlertAccountDetailResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const alertAccountDetailResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'first_name',
      'last_name',
      'email',
      'date_of_birth',
      'alerts_enabled_at',
      'last_screened_at',
      'created_at',
      'alerts',
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
      email: raw['email'],
      date_of_birth: raw['date_of_birth'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      last_screened_at: raw['last_screened_at'],
      created_at: raw['created_at'],
      alerts: raw['alerts'],
    };
  },
  [
    'id',
    'first_name',
    'last_name',
    'email',
    'date_of_birth',
    'alerts_enabled_at',
    'last_screened_at',
    'created_at',
    'alerts',
  ],
);

/**
 * Cast schema for mapping the AlertAccountDetailResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const alertAccountDetailResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      email: raw['email'],
      date_of_birth: raw['date_of_birth'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      last_screened_at: raw['last_screened_at'],
      created_at: raw['created_at'],
      alerts: raw['alerts'],
    };
  },
  [
    'id',
    'first_name',
    'last_name',
    'email',
    'date_of_birth',
    'alerts_enabled_at',
    'last_screened_at',
    'created_at',
    'alerts',
  ],
);
