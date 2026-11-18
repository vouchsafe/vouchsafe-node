import * as core from '../../../../core';
import {
  AlertAccountResponse,
  alertAccountResponse,
  alertAccountResponseRequest,
  alertAccountResponseResponse,
} from './AlertAccountResponse';

export interface ListAlertAccountsResponse {
  accounts: AlertAccountResponse[];
  next_cursor: string | null;
}

/**
 * Cast schema for the ListAlertAccountsResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const listAlertAccountsResponse = core.cast.identity<ListAlertAccountsResponse>();

/**
 * Cast schema for mapping API responses to the ListAlertAccountsResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const listAlertAccountsResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['accounts', 'next_cursor']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      accounts: Array.isArray(raw['accounts'])
        ? (raw['accounts'] as any[]).map((v: any) =>
            v == null ? v : alertAccountResponseResponse.parse(v),
          )
        : (raw['accounts'] as any),
      next_cursor: raw['next_cursor'],
    };
  },
  ['accounts', 'next_cursor'],
);

/**
 * Cast schema for mapping the ListAlertAccountsResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const listAlertAccountsResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      accounts: Array.isArray(raw['accounts'])
        ? (raw['accounts'] as any[]).map((v: any) =>
            v == null ? v : alertAccountResponseRequest.parse(v),
          )
        : (raw['accounts'] as any),
      next_cursor: raw['next_cursor'],
    };
  },
  ['accounts', 'next_cursor'],
);
