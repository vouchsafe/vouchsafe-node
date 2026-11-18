import * as core from '../../../../../../core';
import { FlowTemplate, flowTemplate } from '../../../types/FlowTemplate';
import { CreateTeamInput } from '../client/requests/CreateTeamInput';

/**
 * Input for creating a new team
 */
export type { CreateTeamInput };

/**
 * Cast schema for the CreateTeamInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const createTeamInput = core.cast.identity<CreateTeamInput>();

/**
 * Cast schema for mapping API responses to the CreateTeamInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const createTeamInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'name',
      'public_name',
      'logo_url',
      'team_admin_emails',
      'flow_template',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      name: raw['name'],
      public_name: raw['public_name'],
      logo_url: raw['logo_url'],
      team_admin_emails: raw['team_admin_emails'],
      flow_template: raw['flow_template'],
    };
  },
  ['name', 'team_admin_emails'],
);

/**
 * Cast schema for mapping the CreateTeamInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const createTeamInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      name: raw['name'],
      public_name: raw['public_name'],
      logo_url: raw['logo_url'],
      team_admin_emails: raw['team_admin_emails'],
      flow_template: raw['flow_template'],
    };
  },
  ['name', 'team_admin_emails'],
);
