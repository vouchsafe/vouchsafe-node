import * as core from '../../../../core';
import {
  AcknowledgeAlertResponseSuccess,
  acknowledgeAlertResponseSuccess,
} from './AcknowledgeAlertResponseSuccess';

export interface AcknowledgeAlertResponse {
  success: AcknowledgeAlertResponseSuccess;
  acknowledged_at: string;
}

export namespace AcknowledgeAlertResponse {
  export type Success = AcknowledgeAlertResponseSuccess;
}

/**
 * Cast schema for the AcknowledgeAlertResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const acknowledgeAlertResponse = core.cast.identity<AcknowledgeAlertResponse>();

/**
 * Cast schema for mapping API responses to the AcknowledgeAlertResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const acknowledgeAlertResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['success', 'acknowledged_at']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, success: raw['success'], acknowledged_at: raw['acknowledged_at'] };
  },
  ['success', 'acknowledged_at'],
);

/**
 * Cast schema for mapping the AcknowledgeAlertResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const acknowledgeAlertResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { success: raw['success'], acknowledged_at: raw['acknowledged_at'] };
  },
  ['success', 'acknowledged_at'],
);
