import * as core from '../../../../core';

export interface RequestVerificationResponse {
  /** A unique URL to redirect the user to or embed in an iframe. */
  url: string;
  /** A unique ID for the verification session, for you to track progress. */
  id: string;
  /** The flow it belongs to. */
  flow_id: string;
  /** To be deprecated - use flow_id instead. */
  workflow_id?: string;
  /** When the user will stop getting reminders. */
  expires_at: string;
}

/**
 * Cast schema for the RequestVerificationResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const requestVerificationResponse = core.cast.identity<RequestVerificationResponse>();

/**
 * Cast schema for mapping API responses to the RequestVerificationResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const requestVerificationResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['url', 'id', 'flow_id', 'workflow_id', 'expires_at']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      url: raw['url'],
      id: raw['id'],
      flow_id: raw['flow_id'],
      workflow_id: raw['workflow_id'],
      expires_at: raw['expires_at'],
    };
  },
  ['url', 'id', 'flow_id', 'expires_at'],
);

/**
 * Cast schema for mapping the RequestVerificationResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const requestVerificationResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      url: raw['url'],
      id: raw['id'],
      flow_id: raw['flow_id'],
      workflow_id: raw['workflow_id'],
      expires_at: raw['expires_at'],
    };
  },
  ['url', 'id', 'flow_id', 'expires_at'],
);
