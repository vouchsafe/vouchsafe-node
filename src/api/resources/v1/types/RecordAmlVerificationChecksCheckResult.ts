import * as core from '../../../../core';
import { CheckResult, checkResult, checkResultRequest, checkResultResponse } from './CheckResult';

/**
 * Construct a type with a set of properties K of type T
 */
export interface RecordAmlVerificationChecksCheckResult {
  AML_SANCTIONS_CHECK: CheckResult;
}

/**
 * Cast schema for the RecordAmlVerificationChecksCheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const recordAmlVerificationChecksCheckResult =
  core.cast.identity<RecordAmlVerificationChecksCheckResult>();

/**
 * Cast schema for mapping API responses to the RecordAmlVerificationChecksCheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const recordAmlVerificationChecksCheckResultResponse = core.cast.object(
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
          : checkResultResponse.parse(raw['AML_SANCTIONS_CHECK']),
    };
  },
  ['AML_SANCTIONS_CHECK'],
);

/**
 * Cast schema for mapping the RecordAmlVerificationChecksCheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const recordAmlVerificationChecksCheckResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      AML_SANCTIONS_CHECK:
        raw['AML_SANCTIONS_CHECK'] == null
          ? raw['AML_SANCTIONS_CHECK']
          : checkResultRequest.parse(raw['AML_SANCTIONS_CHECK']),
    };
  },
  ['AML_SANCTIONS_CHECK'],
);
