import * as core from '../../../../core';
import {
  CreateTeamResponseCredentials,
  createTeamResponseCredentials,
  createTeamResponseCredentialsRequest,
  createTeamResponseCredentialsResponse,
} from './CreateTeamResponseCredentials';

/**
 * Response from creating a new team
 */
export interface CreateTeamResponse {
  /** Unique identifier for the created team */
  id: string;
  /** The name of the team. */
  name: string;
  /** The public name of the team, shown in end-user facing screens and communications. If set, overrides the name. */
  public_name?: string;
  /** ISO 8601 timestamp of team creation */
  created_at: string;
  /** Production API credentials for this team */
  credentials: CreateTeamResponseCredentials;
}

export namespace CreateTeamResponse {
  export interface Credentials {
    client_secret: CreateTeamResponseCredentials['client_secret'];
    client_id: CreateTeamResponseCredentials['client_id'];
    environment: CreateTeamResponseCredentials['environment'];
    name: CreateTeamResponseCredentials['name'];
  }
}

/**
 * Cast schema for the CreateTeamResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const createTeamResponse = core.cast.identity<CreateTeamResponse>();

/**
 * Cast schema for mapping API responses to the CreateTeamResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const createTeamResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'name',
      'public_name',
      'created_at',
      'credentials',
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
      name: raw['name'],
      public_name: raw['public_name'],
      created_at: raw['created_at'],
      credentials:
        raw['credentials'] == null
          ? raw['credentials']
          : createTeamResponseCredentialsResponse.parse(raw['credentials']),
    };
  },
  ['id', 'name', 'created_at', 'credentials'],
);

/**
 * Cast schema for mapping the CreateTeamResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const createTeamResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      name: raw['name'],
      public_name: raw['public_name'],
      created_at: raw['created_at'],
      credentials:
        raw['credentials'] == null
          ? raw['credentials']
          : createTeamResponseCredentialsRequest.parse(raw['credentials']),
    };
  },
  ['id', 'name', 'created_at', 'credentials'],
);
