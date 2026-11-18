import * as core from '../../../../../../core';
import { ToggleAlertsInput } from '../client/requests/ToggleAlertsInput';

export type { ToggleAlertsInput };

/**
 * Cast schema for the ToggleAlertsInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const toggleAlertsInput = core.cast.identity<ToggleAlertsInput>();

/**
 * Cast schema for mapping API responses to the ToggleAlertsInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const toggleAlertsInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['alerts_enabled']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, alerts_enabled: raw['alerts_enabled'] };
  },
  ['alerts_enabled'],
);

/**
 * Cast schema for mapping the ToggleAlertsInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const toggleAlertsInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { alerts_enabled: raw['alerts_enabled'] };
  },
  ['alerts_enabled'],
);
