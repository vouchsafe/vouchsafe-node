import * as core from '../../../../core';
import {
  OfficialRecordsReport,
  officialRecordsReport,
  officialRecordsReportRequest,
  officialRecordsReportResponse,
} from './OfficialRecordsReport';
import {
  OnlineFootprintVerificationReport,
  onlineFootprintVerificationReport,
  onlineFootprintVerificationReportRequest,
  onlineFootprintVerificationReportResponse,
} from './OnlineFootprintVerificationReport';
import {
  AmlVerificationReport,
  amlVerificationReport,
  amlVerificationReportRequest,
  amlVerificationReportResponse,
} from './AmlVerificationReport';
import {
  AdverseMediaRiskReport,
  adverseMediaRiskReport,
  adverseMediaRiskReportRequest,
  adverseMediaRiskReportResponse,
} from './AdverseMediaRiskReport';

export interface EnrichmentReports {
  official_records?: OfficialRecordsReport;
  credit_bureau?: OfficialRecordsReport;
  online_footprint?: OnlineFootprintVerificationReport;
  aml?: AmlVerificationReport;
  adverse_media?: AdverseMediaRiskReport;
}

/**
 * Cast schema for the EnrichmentReports model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const enrichmentReports = core.cast.identity<EnrichmentReports>();

/**
 * Cast schema for mapping API responses to the EnrichmentReports application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const enrichmentReportsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'official_records',
    'credit_bureau',
    'online_footprint',
    'aml',
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
        : officialRecordsReportResponse.parse(raw['official_records']),
    credit_bureau:
      raw['credit_bureau'] == null
        ? raw['credit_bureau']
        : officialRecordsReportResponse.parse(raw['credit_bureau']),
    online_footprint:
      raw['online_footprint'] == null
        ? raw['online_footprint']
        : onlineFootprintVerificationReportResponse.parse(raw['online_footprint']),
    aml: raw['aml'] == null ? raw['aml'] : amlVerificationReportResponse.parse(raw['aml']),
    adverse_media:
      raw['adverse_media'] == null
        ? raw['adverse_media']
        : adverseMediaRiskReportResponse.parse(raw['adverse_media']),
  };
}, []);

/**
 * Cast schema for mapping the EnrichmentReports application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const enrichmentReportsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    official_records:
      raw['official_records'] == null
        ? raw['official_records']
        : officialRecordsReportRequest.parse(raw['official_records']),
    credit_bureau:
      raw['credit_bureau'] == null
        ? raw['credit_bureau']
        : officialRecordsReportRequest.parse(raw['credit_bureau']),
    online_footprint:
      raw['online_footprint'] == null
        ? raw['online_footprint']
        : onlineFootprintVerificationReportRequest.parse(raw['online_footprint']),
    aml: raw['aml'] == null ? raw['aml'] : amlVerificationReportRequest.parse(raw['aml']),
    adverse_media:
      raw['adverse_media'] == null
        ? raw['adverse_media']
        : adverseMediaRiskReportRequest.parse(raw['adverse_media']),
  };
}, []);
