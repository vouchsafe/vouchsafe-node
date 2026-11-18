import * as core from '../../../../core';

export interface AuthenticateResponse {
  access_token: string;
  expires_at: string;
  /** Seconds until the token expires. */
  expires_in: number;
}

/**
 * Cast schema for the AuthenticateResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const authenticateResponse = core.cast.identity<AuthenticateResponse>();

/**
 * Cast schema for mapping API responses to the AuthenticateResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const authenticateResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['access_token', 'expires_at', 'expires_in']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      access_token: raw['access_token'],
      expires_at: raw['expires_at'],
      expires_in: raw['expires_in'],
    };
  },
  ['access_token', 'expires_at', 'expires_in'],
);

/**
 * Cast schema for mapping the AuthenticateResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const authenticateResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      access_token: raw['access_token'],
      expires_at: raw['expires_at'],
      expires_in: raw['expires_in'],
    };
  },
  ['access_token', 'expires_at', 'expires_in'],
);
