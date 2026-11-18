import * as core from '../../../../core';
import { CheckState, checkState } from './CheckState';
import {
  RecordAmlVerificationChecksCheckResult,
  recordAmlVerificationChecksCheckResult,
  recordAmlVerificationChecksCheckResultRequest,
  recordAmlVerificationChecksCheckResultResponse,
} from './RecordAmlVerificationChecksCheckResult';

export interface AmlVerificationReport {
  state: CheckState;
  /** Construct a type with a set of properties K of type T */
  checks: RecordAmlVerificationChecksCheckResult;
}

/**
 * Cast schema for the AmlVerificationReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlVerificationReport = core.cast.identity<AmlVerificationReport>();

/**
 * Cast schema for mapping API responses to the AmlVerificationReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlVerificationReportResponse = core.cast.object(
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
          : recordAmlVerificationChecksCheckResultResponse.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);

/**
 * Cast schema for mapping the AmlVerificationReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlVerificationReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      state: raw['state'],
      checks:
        raw['checks'] == null
          ? raw['checks']
          : recordAmlVerificationChecksCheckResultRequest.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);
