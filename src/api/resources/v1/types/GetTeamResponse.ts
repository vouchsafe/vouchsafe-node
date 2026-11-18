import * as core from '../../../../core';
import { GetTeamResponsePlan, getTeamResponsePlan } from './GetTeamResponsePlan';

export interface GetTeamResponse {
  /** The client ID of the team, as shown in the dashboard */
  id: string;
  /** The name of the team */
  name: string;
  /** The public name of the team, shown in end-user facing screens and communications. If set, overrides the name. */
  public_name: string;
  /** Which plan is the team on? */
  plan: GetTeamResponsePlan;
  /** Path to the team's logo image */
  logo_url: string;
  /** When the team's details were last changed, formatted as an ISO 8601 string */
  updated_at: string;
  /** When the team was created, formatted as an ISO 8601 string */
  created_at: string;
}

export namespace GetTeamResponse {
  export type Plan = GetTeamResponsePlan;
  export const Plan = GetTeamResponsePlan;
}

/**
 * Cast schema for the GetTeamResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const getTeamResponse = core.cast.identity<GetTeamResponse>();

/**
 * Cast schema for mapping API responses to the GetTeamResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const getTeamResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'name',
      'public_name',
      'plan',
      'logo_url',
      'updated_at',
      'created_at',
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
      plan: raw['plan'],
      logo_url: raw['logo_url'],
      updated_at: raw['updated_at'],
      created_at: raw['created_at'],
    };
  },
  ['id', 'name', 'public_name', 'plan', 'logo_url', 'updated_at', 'created_at'],
);

/**
 * Cast schema for mapping the GetTeamResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const getTeamResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      name: raw['name'],
      public_name: raw['public_name'],
      plan: raw['plan'],
      logo_url: raw['logo_url'],
      updated_at: raw['updated_at'],
      created_at: raw['created_at'],
    };
  },
  ['id', 'name', 'public_name', 'plan', 'logo_url', 'updated_at', 'created_at'],
);
