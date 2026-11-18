import * as core from '../../../../../../core';

export interface AuthenticateInput {
  client_id: string;
  client_secret: string;
}

/**
 * Cast schema for the AuthenticateInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const authenticateInput = core.cast.identity<AuthenticateInput>();

/**
 * Cast schema for mapping API responses to the AuthenticateInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const authenticateInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['client_id', 'client_secret']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, client_id: raw['client_id'], client_secret: raw['client_secret'] };
  },
  ['client_id', 'client_secret'],
);

/**
 * Cast schema for mapping the AuthenticateInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const authenticateInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { client_id: raw['client_id'], client_secret: raw['client_secret'] };
  },
  ['client_id', 'client_secret'],
);
