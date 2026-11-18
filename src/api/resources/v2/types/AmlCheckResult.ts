import * as core from '../../../../core';
import { AmlCheckState, amlCheckState } from './AmlCheckState';

export interface AmlCheckResult {
  state: AmlCheckState;
}

/**
 * Cast schema for the AmlCheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlCheckResult = core.cast.identity<AmlCheckResult>();

/**
 * Cast schema for mapping API responses to the AmlCheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlCheckResultResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['state']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, state: raw['state'] };
  },
  ['state'],
);

/**
 * Cast schema for mapping the AmlCheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlCheckResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { state: raw['state'] };
  },
  ['state'],
);
