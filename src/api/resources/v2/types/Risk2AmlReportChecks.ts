import * as core from '../../../../core';
import {
  AmlCheckResult,
  amlCheckResult,
  amlCheckResultRequest,
  amlCheckResultResponse,
} from './AmlCheckResult';

export interface Risk2AmlReportChecks {
  AML_SANCTIONS_CHECK: AmlCheckResult;
}

/**
 * Cast schema for the Risk2AmlReportChecks model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2AmlReportChecks = core.cast.identity<Risk2AmlReportChecks>();

/**
 * Cast schema for mapping API responses to the Risk2AmlReportChecks application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2AmlReportChecksResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['AML_SANCTIONS_CHECK']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      AML_SANCTIONS_CHECK:
        raw['AML_SANCTIONS_CHECK'] == null
          ? raw['AML_SANCTIONS_CHECK']
          : amlCheckResultResponse.parse(raw['AML_SANCTIONS_CHECK']),
    };
  },
  ['AML_SANCTIONS_CHECK'],
);

/**
 * Cast schema for mapping the Risk2AmlReportChecks application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2AmlReportChecksRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      AML_SANCTIONS_CHECK:
        raw['AML_SANCTIONS_CHECK'] == null
          ? raw['AML_SANCTIONS_CHECK']
          : amlCheckResultRequest.parse(raw['AML_SANCTIONS_CHECK']),
    };
  },
  ['AML_SANCTIONS_CHECK'],
);
