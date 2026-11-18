import * as core from '../../../../core';
import {
  Risk2OfficialRecordsReportChecks,
  risk2OfficialRecordsReportChecks,
  risk2OfficialRecordsReportChecksRequest,
  risk2OfficialRecordsReportChecksResponse,
} from './Risk2OfficialRecordsReportChecks';
import { OfficialRecordsCheckState, officialRecordsCheckState } from './OfficialRecordsCheckState';

export interface Risk2OfficialRecordsReport {
  checks: Risk2OfficialRecordsReportChecks;
  state: OfficialRecordsCheckState;
}

export namespace Risk2OfficialRecordsReport {
  export interface Checks {
    RESIDENCY_MATCH: Risk2OfficialRecordsReportChecks['RESIDENCY_MATCH'];
    IDENTITY_MATCH: Risk2OfficialRecordsReportChecks['IDENTITY_MATCH'];
  }
}

/**
 * Cast schema for the Risk2OfficialRecordsReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2OfficialRecordsReport = core.cast.identity<Risk2OfficialRecordsReport>();

/**
 * Cast schema for mapping API responses to the Risk2OfficialRecordsReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2OfficialRecordsReportResponse = core.cast.object(
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
          : risk2OfficialRecordsReportChecksResponse.parse(raw['checks']),
      state: raw['state'],
    };
  },
  ['checks', 'state'],
);

/**
 * Cast schema for mapping the Risk2OfficialRecordsReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2OfficialRecordsReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      checks:
        raw['checks'] == null
          ? raw['checks']
          : risk2OfficialRecordsReportChecksRequest.parse(raw['checks']),
      state: raw['state'],
    };
  },
  ['checks', 'state'],
);
