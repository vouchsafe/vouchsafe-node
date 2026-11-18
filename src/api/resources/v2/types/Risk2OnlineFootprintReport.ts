import * as core from '../../../../core';
import {
  Risk2OnlineFootprintReportChecks,
  risk2OnlineFootprintReportChecks,
  risk2OnlineFootprintReportChecksRequest,
  risk2OnlineFootprintReportChecksResponse,
} from './Risk2OnlineFootprintReportChecks';
import { OnlineFootprintCheckState, onlineFootprintCheckState } from './OnlineFootprintCheckState';

export interface Risk2OnlineFootprintReport {
  checks: Risk2OnlineFootprintReportChecks;
  state: OnlineFootprintCheckState;
}

export namespace Risk2OnlineFootprintReport {
  export interface Checks {
    PHONE_SCORE?: Risk2OnlineFootprintReportChecks['PHONE_SCORE'];
    EMAIL_SCORE?: Risk2OnlineFootprintReportChecks['EMAIL_SCORE'];
  }
}

/**
 * Cast schema for the Risk2OnlineFootprintReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2OnlineFootprintReport = core.cast.identity<Risk2OnlineFootprintReport>();

/**
 * Cast schema for mapping API responses to the Risk2OnlineFootprintReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2OnlineFootprintReportResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['checks', 'state']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      checks:
        raw['checks'] == null
          ? raw['checks']
          : risk2OnlineFootprintReportChecksResponse.parse(raw['checks']),
      state: raw['state'],
    };
  },
  ['checks', 'state'],
);

/**
 * Cast schema for mapping the Risk2OnlineFootprintReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2OnlineFootprintReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      checks:
        raw['checks'] == null
          ? raw['checks']
          : risk2OnlineFootprintReportChecksRequest.parse(raw['checks']),
      state: raw['state'],
    };
  },
  ['checks', 'state'],
);
