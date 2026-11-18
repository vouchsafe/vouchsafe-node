import * as core from '../../../../core';
import { CheckResult, checkResult, checkResultRequest, checkResultResponse } from './CheckResult';

/**
 * Construct a type with a set of properties K of type T
 */
export interface RecordCreditBureauVerificationChecksCheckResult {
  IDENTITY_MATCH: CheckResult;
  RESIDENCY_MATCH: CheckResult;
}

/**
 * Cast schema for the RecordCreditBureauVerificationChecksCheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const recordCreditBureauVerificationChecksCheckResult =
  core.cast.identity<RecordCreditBureauVerificationChecksCheckResult>();

/**
 * Cast schema for mapping API responses to the RecordCreditBureauVerificationChecksCheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const recordCreditBureauVerificationChecksCheckResultResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['IDENTITY_MATCH', 'RESIDENCY_MATCH']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      IDENTITY_MATCH:
        raw['IDENTITY_MATCH'] == null
          ? raw['IDENTITY_MATCH']
          : checkResultResponse.parse(raw['IDENTITY_MATCH']),
      RESIDENCY_MATCH:
        raw['RESIDENCY_MATCH'] == null
          ? raw['RESIDENCY_MATCH']
          : checkResultResponse.parse(raw['RESIDENCY_MATCH']),
    };
  },
  ['IDENTITY_MATCH', 'RESIDENCY_MATCH'],
);

/**
 * Cast schema for mapping the RecordCreditBureauVerificationChecksCheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const recordCreditBureauVerificationChecksCheckResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      IDENTITY_MATCH:
        raw['IDENTITY_MATCH'] == null
          ? raw['IDENTITY_MATCH']
          : checkResultRequest.parse(raw['IDENTITY_MATCH']),
      RESIDENCY_MATCH:
        raw['RESIDENCY_MATCH'] == null
          ? raw['RESIDENCY_MATCH']
          : checkResultRequest.parse(raw['RESIDENCY_MATCH']),
    };
  },
  ['IDENTITY_MATCH', 'RESIDENCY_MATCH'],
);
