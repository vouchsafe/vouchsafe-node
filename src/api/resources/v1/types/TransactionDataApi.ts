import * as core from '../../../../core';

export interface TransactionDataApi {
  count: number;
  last_date?: string;
  earliest_date?: string;
}

/**
 * Cast schema for the TransactionDataApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const transactionDataApi = core.cast.identity<TransactionDataApi>();

/**
 * Cast schema for mapping API responses to the TransactionDataApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const transactionDataApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['count', 'last_date', 'earliest_date']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      count: raw['count'],
      last_date: raw['last_date'],
      earliest_date: raw['earliest_date'],
    };
  },
  ['count'],
);

/**
 * Cast schema for mapping the TransactionDataApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const transactionDataApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      count: raw['count'],
      last_date: raw['last_date'],
      earliest_date: raw['earliest_date'],
    };
  },
  ['count'],
);
