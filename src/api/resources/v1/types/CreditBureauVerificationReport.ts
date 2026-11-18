import * as core from '../../../../core';
import { CheckState, checkState } from './CheckState';
import {
  RecordCreditBureauVerificationChecksCheckResult,
  recordCreditBureauVerificationChecksCheckResult,
  recordCreditBureauVerificationChecksCheckResultRequest,
  recordCreditBureauVerificationChecksCheckResultResponse,
} from './RecordCreditBureauVerificationChecksCheckResult';

export interface CreditBureauVerificationReport {
  state: CheckState;
  /** Construct a type with a set of properties K of type T */
  checks: RecordCreditBureauVerificationChecksCheckResult;
}

/**
 * Cast schema for the CreditBureauVerificationReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const creditBureauVerificationReport = core.cast.identity<CreditBureauVerificationReport>();

/**
 * Cast schema for mapping API responses to the CreditBureauVerificationReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const creditBureauVerificationReportResponse = core.cast.object(
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
          : recordCreditBureauVerificationChecksCheckResultResponse.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);

/**
 * Cast schema for mapping the CreditBureauVerificationReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const creditBureauVerificationReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      state: raw['state'],
      checks:
        raw['checks'] == null
          ? raw['checks']
          : recordCreditBureauVerificationChecksCheckResultRequest.parse(raw['checks']),
    };
  },
  ['state', 'checks'],
);
