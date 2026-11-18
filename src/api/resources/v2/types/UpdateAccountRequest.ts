import * as core from '../../../../core';

/**
 * Make all properties in T optional
 */
export interface UpdateAccountRequest {
  first_name?: string;
  last_name?: string;
  /** Date of birth in YYYY-MM-DD format. */
  date_of_birth?: string;
  email?: string;
}

/**
 * Cast schema for the UpdateAccountRequest model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const updateAccountRequest = core.cast.identity<UpdateAccountRequest>();

/**
 * Cast schema for mapping API responses to the UpdateAccountRequest application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const updateAccountRequestResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['first_name', 'last_name', 'date_of_birth', 'email']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    first_name: raw['first_name'],
    last_name: raw['last_name'],
    date_of_birth: raw['date_of_birth'],
    email: raw['email'],
  };
}, []);

/**
 * Cast schema for mapping the UpdateAccountRequest application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const updateAccountRequestRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    first_name: raw['first_name'],
    last_name: raw['last_name'],
    date_of_birth: raw['date_of_birth'],
    email: raw['email'],
  };
}, []);
