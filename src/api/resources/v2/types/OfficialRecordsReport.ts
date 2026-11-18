import * as core from '../../../../core';
import { CheckState, checkState } from './CheckState';
import {
  OfficialRecordsReportChecks,
  officialRecordsReportChecks,
  officialRecordsReportChecksRequest,
  officialRecordsReportChecksResponse,
} from './OfficialRecordsReportChecks';

export interface OfficialRecordsReport {
  state: CheckState;
  checks: OfficialRecordsReportChecks;
}

export namespace OfficialRecordsReport {
  export interface Checks {
    RESIDENCY_MATCH: OfficialRecordsReportChecks['RESIDENCY_MATCH'];
    IDENTITY_MATCH: OfficialRecordsReportChecks['IDENTITY_MATCH'];
  }
}

/**
 * Cast schema for the OfficialRecordsReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const officialRecordsReport = core.cast.identity<OfficialRecordsReport>();

/**
 * Cast schema for mapping API responses to the OfficialRecordsReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const officialRecordsReportResponse = core.cast.object(
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
        raw['checks'] == null
          ? raw['checks']
          : officialRecordsReportChecksResponse.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);

/**
 * Cast schema for mapping the OfficialRecordsReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const officialRecordsReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      state: raw['state'],
      checks:
        raw['checks'] == null
          ? raw['checks']
          : officialRecordsReportChecksRequest.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);
