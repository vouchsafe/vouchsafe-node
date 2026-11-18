import * as core from '../../../../core';
import { ApiValidationStatus, apiValidationStatus } from './ApiValidationStatus';
import {
  TamperingSignalsCheckFailedReason,
  tamperingSignalsCheckFailedReason,
} from './TamperingSignalsCheckFailedReason';

export interface TamperingSignalsCheckResult {
  status: ApiValidationStatus;
  failed_reasons?: TamperingSignalsCheckFailedReason[];
}

/**
 * Cast schema for the TamperingSignalsCheckResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const tamperingSignalsCheckResult = core.cast.identity<TamperingSignalsCheckResult>();

/**
 * Cast schema for mapping API responses to the TamperingSignalsCheckResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const tamperingSignalsCheckResultResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['status', 'failed_reasons']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, status: raw['status'], failed_reasons: raw['failed_reasons'] };
  },
  ['status'],
);

/**
 * Cast schema for mapping the TamperingSignalsCheckResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const tamperingSignalsCheckResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { status: raw['status'], failed_reasons: raw['failed_reasons'] };
  },
  ['status'],
);
