import * as core from '../../../../core';
import { CheckState, checkState } from './CheckState';
import { Reason, reason } from './Reason';

export interface CheckResult {
  state: CheckState;
  reason?: Reason;
}

/**
 * Cast schema for the CheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const checkResult = core.cast.identity<CheckResult>();

/**
 * Cast schema for mapping API responses to the CheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const checkResultResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['state', 'reason']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, state: raw['state'], reason: raw['reason'] };
  },
  ['state'],
);

/**
 * Cast schema for mapping the CheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const checkResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { state: raw['state'], reason: raw['reason'] };
  },
  ['state'],
);
