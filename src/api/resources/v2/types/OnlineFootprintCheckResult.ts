import * as core from '../../../../core';
import {
  OnlineFootprintCheckResultReason,
  onlineFootprintCheckResultReason,
} from './OnlineFootprintCheckResultReason';
import { OnlineFootprintCheckState, onlineFootprintCheckState } from './OnlineFootprintCheckState';

export interface OnlineFootprintCheckResult {
  reason?: OnlineFootprintCheckResultReason;
  state: OnlineFootprintCheckState;
}

export namespace OnlineFootprintCheckResult {
  export type Reason = OnlineFootprintCheckResultReason;
  export const Reason = OnlineFootprintCheckResultReason;
}

/**
 * Cast schema for the OnlineFootprintCheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const onlineFootprintCheckResult = core.cast.identity<OnlineFootprintCheckResult>();

/**
 * Cast schema for mapping API responses to the OnlineFootprintCheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const onlineFootprintCheckResultResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['reason', 'state']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, reason: raw['reason'], state: raw['state'] };
  },
  ['state'],
);

/**
 * Cast schema for mapping the OnlineFootprintCheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const onlineFootprintCheckResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { reason: raw['reason'], state: raw['state'] };
  },
  ['state'],
);
