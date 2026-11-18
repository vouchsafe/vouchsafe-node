import * as core from '../../../../core';
import { Environment, environment } from './Environment';

/**
 * Production API credentials for this team
 */
export interface CreateTeamResponseCredentials {
  /** Client secret for API authentication */
  client_secret: string;
  /** Client ID for API authentication */
  client_id: string;
  environment: Environment;
  /** Name of the API key */
  name: string;
}

/**
 * Cast schema for the CreateTeamResponseCredentials model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const createTeamResponseCredentials = core.cast.identity<CreateTeamResponseCredentials>();

/**
 * Cast schema for mapping API responses to the CreateTeamResponseCredentials application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const createTeamResponseCredentialsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['client_secret', 'client_id', 'environment', 'name']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      client_secret: raw['client_secret'],
      client_id: raw['client_id'],
      environment: raw['environment'],
      name: raw['name'],
    };
  },
  ['client_secret', 'client_id', 'environment', 'name'],
);

/**
 * Cast schema for mapping the CreateTeamResponseCredentials application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const createTeamResponseCredentialsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      client_secret: raw['client_secret'],
      client_id: raw['client_id'],
      environment: raw['environment'],
      name: raw['name'],
    };
  },
  ['client_secret', 'client_id', 'environment', 'name'],
);
