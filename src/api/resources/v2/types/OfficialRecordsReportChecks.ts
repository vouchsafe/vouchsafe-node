import * as core from '../../../../core';
import { CheckResult, checkResult, checkResultRequest, checkResultResponse } from './CheckResult';

export interface OfficialRecordsReportChecks {
  RESIDENCY_MATCH: CheckResult;
  IDENTITY_MATCH: CheckResult;
}

/**
 * Cast schema for the OfficialRecordsReportChecks model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const officialRecordsReportChecks = core.cast.identity<OfficialRecordsReportChecks>();

/**
 * Cast schema for mapping API responses to the OfficialRecordsReportChecks application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const officialRecordsReportChecksResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['RESIDENCY_MATCH', 'IDENTITY_MATCH']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      RESIDENCY_MATCH:
        raw['RESIDENCY_MATCH'] == null
          ? raw['RESIDENCY_MATCH']
          : checkResultResponse.parse(raw['RESIDENCY_MATCH']),
      IDENTITY_MATCH:
        raw['IDENTITY_MATCH'] == null
          ? raw['IDENTITY_MATCH']
          : checkResultResponse.parse(raw['IDENTITY_MATCH']),
    };
  },
  ['RESIDENCY_MATCH', 'IDENTITY_MATCH'],
);

/**
 * Cast schema for mapping the OfficialRecordsReportChecks application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const officialRecordsReportChecksRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      RESIDENCY_MATCH:
        raw['RESIDENCY_MATCH'] == null
          ? raw['RESIDENCY_MATCH']
          : checkResultRequest.parse(raw['RESIDENCY_MATCH']),
      IDENTITY_MATCH:
        raw['IDENTITY_MATCH'] == null
          ? raw['IDENTITY_MATCH']
          : checkResultRequest.parse(raw['IDENTITY_MATCH']),
    };
  },
  ['RESIDENCY_MATCH', 'IDENTITY_MATCH'],
);
