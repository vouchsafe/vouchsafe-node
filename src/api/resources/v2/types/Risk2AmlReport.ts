import * as core from '../../../../core';
import {
  Risk2AmlReportChecks,
  risk2AmlReportChecks,
  risk2AmlReportChecksRequest,
  risk2AmlReportChecksResponse,
} from './Risk2AmlReportChecks';
import { AmlCheckState, amlCheckState } from './AmlCheckState';

export interface Risk2AmlReport {
  checks: Risk2AmlReportChecks;
  state: AmlCheckState;
}

export namespace Risk2AmlReport {
  export interface Checks {
    AML_SANCTIONS_CHECK: Risk2AmlReportChecks['AML_SANCTIONS_CHECK'];
  }
}

/**
 * Cast schema for the Risk2AmlReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2AmlReport = core.cast.identity<Risk2AmlReport>();

/**
 * Cast schema for mapping API responses to the Risk2AmlReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2AmlReportResponse = core.cast.object(
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
        raw['checks'] == null ? raw['checks'] : risk2AmlReportChecksResponse.parse(raw['checks']),
      state: raw['state'],
    };
  },
  ['checks', 'state'],
);

/**
 * Cast schema for mapping the Risk2AmlReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2AmlReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      checks:
        raw['checks'] == null ? raw['checks'] : risk2AmlReportChecksRequest.parse(raw['checks']),
      state: raw['state'],
    };
  },
  ['checks', 'state'],
);
