import * as core from '../../../../core';
import {
  Risk2OfficialRecordsReport,
  risk2OfficialRecordsReport,
  risk2OfficialRecordsReportRequest,
  risk2OfficialRecordsReportResponse,
} from './Risk2OfficialRecordsReport';
import {
  Risk2AmlReport,
  risk2AmlReport,
  risk2AmlReportRequest,
  risk2AmlReportResponse,
} from './Risk2AmlReport';
import {
  Risk2OnlineFootprintReport,
  risk2OnlineFootprintReport,
  risk2OnlineFootprintReportRequest,
  risk2OnlineFootprintReportResponse,
} from './Risk2OnlineFootprintReport';
import {
  Risk2AdverseMediaReport,
  risk2AdverseMediaReport,
  risk2AdverseMediaReportRequest,
  risk2AdverseMediaReportResponse,
} from './Risk2AdverseMediaReport';

export interface Risk2EnrichmentReports {
  official_records?: Risk2OfficialRecordsReport;
  aml?: Risk2AmlReport;
  online_footprint?: Risk2OnlineFootprintReport;
  adverse_media?: Risk2AdverseMediaReport;
}

/**
 * Cast schema for the Risk2EnrichmentReports model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2EnrichmentReports = core.cast.identity<Risk2EnrichmentReports>();

/**
 * Cast schema for mapping API responses to the Risk2EnrichmentReports application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2EnrichmentReportsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'official_records',
    'aml',
    'online_footprint',
    'adverse_media',
  ]);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    official_records:
      raw['official_records'] == null
        ? raw['official_records']
        : risk2OfficialRecordsReportResponse.parse(raw['official_records']),
    aml: raw['aml'] == null ? raw['aml'] : risk2AmlReportResponse.parse(raw['aml']),
    online_footprint:
      raw['online_footprint'] == null
        ? raw['online_footprint']
        : risk2OnlineFootprintReportResponse.parse(raw['online_footprint']),
    adverse_media:
      raw['adverse_media'] == null
        ? raw['adverse_media']
        : risk2AdverseMediaReportResponse.parse(raw['adverse_media']),
  };
}, []);

/**
 * Cast schema for mapping the Risk2EnrichmentReports application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2EnrichmentReportsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    official_records:
      raw['official_records'] == null
        ? raw['official_records']
        : risk2OfficialRecordsReportRequest.parse(raw['official_records']),
    aml: raw['aml'] == null ? raw['aml'] : risk2AmlReportRequest.parse(raw['aml']),
    online_footprint:
      raw['online_footprint'] == null
        ? raw['online_footprint']
        : risk2OnlineFootprintReportRequest.parse(raw['online_footprint']),
    adverse_media:
      raw['adverse_media'] == null
        ? raw['adverse_media']
        : risk2AdverseMediaReportRequest.parse(raw['adverse_media']),
  };
}, []);
