import * as core from '../../../../core';
import {
  OfficialRecordsCheckResultReason,
  officialRecordsCheckResultReason,
} from './OfficialRecordsCheckResultReason';
import { OfficialRecordsCheckState, officialRecordsCheckState } from './OfficialRecordsCheckState';

export interface OfficialRecordsCheckResult {
  reason?: OfficialRecordsCheckResultReason;
  state: OfficialRecordsCheckState;
}

export namespace OfficialRecordsCheckResult {
  export type Reason = OfficialRecordsCheckResultReason;
  export const Reason = OfficialRecordsCheckResultReason;
}

/**
 * Cast schema for the OfficialRecordsCheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const officialRecordsCheckResult = core.cast.identity<OfficialRecordsCheckResult>();

/**
 * Cast schema for mapping API responses to the OfficialRecordsCheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const officialRecordsCheckResultResponse = core.cast.object(
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
 * Cast schema for mapping the OfficialRecordsCheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const officialRecordsCheckResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { reason: raw['reason'], state: raw['state'] };
  },
  ['state'],
);
