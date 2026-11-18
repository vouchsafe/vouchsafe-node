import * as core from '../../../../core';
import { AccountResponseObject, accountResponseObject } from './AccountResponseObject';

export interface AccountResponse {
  /** Unique identifier, prefixed with `acc_`. */
  id: string;
  object: AccountResponseObject;
  first_name: string;
  last_name: string;
  /** Date of birth in YYYY-MM-DD format. */
  date_of_birth: string;
  email: string;
  /** ISO 8601 timestamp of when the account was created. */
  created_at: string;
  /** ISO 8601 timestamp of when the account was last updated. */
  updated_at: string;
}

export namespace AccountResponse {
  export type Object_ = AccountResponseObject;
  export const Object_ = AccountResponseObject;
}

/**
 * Cast schema for the AccountResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const accountResponse = core.cast.identity<AccountResponse>();

/**
 * Cast schema for mapping API responses to the AccountResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const accountResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'object',
      'first_name',
      'last_name',
      'date_of_birth',
      'email',
      'created_at',
      'updated_at',
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
      object: raw['object'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
      created_at: raw['created_at'],
      updated_at: raw['updated_at'],
    };
  },
  ['id', 'object', 'first_name', 'last_name', 'date_of_birth', 'email', 'created_at', 'updated_at'],
);

/**
 * Cast schema for mapping the AccountResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const accountResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      object: raw['object'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
      created_at: raw['created_at'],
      updated_at: raw['updated_at'],
    };
  },
  ['id', 'object', 'first_name', 'last_name', 'date_of_birth', 'email', 'created_at', 'updated_at'],
);
