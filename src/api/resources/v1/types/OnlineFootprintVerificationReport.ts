import * as core from '../../../../core';
import { CheckState, checkState } from './CheckState';
import {
  OnlineFootprintChecks,
  onlineFootprintChecks,
  onlineFootprintChecksRequest,
  onlineFootprintChecksResponse,
} from './OnlineFootprintChecks';

export interface OnlineFootprintVerificationReport {
  state: CheckState;
  checks: OnlineFootprintChecks;
}

/**
 * Cast schema for the OnlineFootprintVerificationReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const onlineFootprintVerificationReport =
  core.cast.identity<OnlineFootprintVerificationReport>();

/**
 * Cast schema for mapping API responses to the OnlineFootprintVerificationReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const onlineFootprintVerificationReportResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['state', 'checks']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      state: raw['state'],
      checks:
        raw['checks'] == null ? raw['checks'] : onlineFootprintChecksResponse.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);

/**
 * Cast schema for mapping the OnlineFootprintVerificationReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const onlineFootprintVerificationReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      state: raw['state'],
      checks:
        raw['checks'] == null ? raw['checks'] : onlineFootprintChecksRequest.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);
