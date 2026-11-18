import * as core from '../../../../core';

export interface CreateAccountRequest {
  first_name: string;
  last_name: string;
  /** Date of birth in YYYY-MM-DD format. */
  date_of_birth: string;
  email: string;
}

/**
 * Cast schema for the CreateAccountRequest model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const createAccountRequest = core.cast.identity<CreateAccountRequest>();

/**
 * Cast schema for mapping API responses to the CreateAccountRequest application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const createAccountRequestResponse = core.cast.object(
  (raw: any): any => {
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
  },
  ['first_name', 'last_name', 'date_of_birth', 'email'],
);

/**
 * Cast schema for mapping the CreateAccountRequest application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const createAccountRequestRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'email'],
);
