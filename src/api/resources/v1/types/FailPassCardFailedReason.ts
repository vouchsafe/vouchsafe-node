import * as core from '../../../../core';
import {
  PassCardFailedReason,
  passCardFailedReason,
  passCardFailedReasonRequest,
  passCardFailedReasonResponse,
} from './PassCardFailedReason';

export interface FailPassCardFailedReason {
  failed_reasons: PassCardFailedReason[];
}

/**
 * Cast schema for the FailPassCardFailedReason model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const failPassCardFailedReason = core.cast.identity<FailPassCardFailedReason>();

/**
 * Cast schema for mapping API responses to the FailPassCardFailedReason application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const failPassCardFailedReasonResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['failed_reasons']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);

/**
 * Cast schema for mapping the FailPassCardFailedReason application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const failPassCardFailedReasonRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);
