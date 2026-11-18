import * as core from '../../../../core';
import {
  ToggleAlertsResponseSuccess,
  toggleAlertsResponseSuccess,
} from './ToggleAlertsResponseSuccess';

export interface ToggleAlertsResponse {
  success: ToggleAlertsResponseSuccess;
}

export namespace ToggleAlertsResponse {
  export type Success = ToggleAlertsResponseSuccess;
}

/**
 * Cast schema for the ToggleAlertsResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const toggleAlertsResponse = core.cast.identity<ToggleAlertsResponse>();

/**
 * Cast schema for mapping API responses to the ToggleAlertsResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const toggleAlertsResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['success']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, success: raw['success'] };
  },
  ['success'],
);

/**
 * Cast schema for mapping the ToggleAlertsResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const toggleAlertsResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { success: raw['success'] };
  },
  ['success'],
);
