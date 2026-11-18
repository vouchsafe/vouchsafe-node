import * as core from '../../../../core';
import {
  OfficialRecordsCheckResult,
  officialRecordsCheckResult,
  officialRecordsCheckResultRequest,
  officialRecordsCheckResultResponse,
} from './OfficialRecordsCheckResult';

export interface Risk2OfficialRecordsReportChecks {
  RESIDENCY_MATCH: OfficialRecordsCheckResult;
  IDENTITY_MATCH: OfficialRecordsCheckResult;
}

/**
 * Cast schema for the Risk2OfficialRecordsReportChecks model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2OfficialRecordsReportChecks =
  core.cast.identity<Risk2OfficialRecordsReportChecks>();

/**
 * Cast schema for mapping API responses to the Risk2OfficialRecordsReportChecks application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2OfficialRecordsReportChecksResponse = core.cast.object(
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
          : officialRecordsCheckResultResponse.parse(raw['RESIDENCY_MATCH']),
      IDENTITY_MATCH:
        raw['IDENTITY_MATCH'] == null
          ? raw['IDENTITY_MATCH']
          : officialRecordsCheckResultResponse.parse(raw['IDENTITY_MATCH']),
    };
  },
  ['RESIDENCY_MATCH', 'IDENTITY_MATCH'],
);

/**
 * Cast schema for mapping the Risk2OfficialRecordsReportChecks application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2OfficialRecordsReportChecksRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      RESIDENCY_MATCH:
        raw['RESIDENCY_MATCH'] == null
          ? raw['RESIDENCY_MATCH']
          : officialRecordsCheckResultRequest.parse(raw['RESIDENCY_MATCH']),
      IDENTITY_MATCH:
        raw['IDENTITY_MATCH'] == null
          ? raw['IDENTITY_MATCH']
          : officialRecordsCheckResultRequest.parse(raw['IDENTITY_MATCH']),
    };
  },
  ['RESIDENCY_MATCH', 'IDENTITY_MATCH'],
);
