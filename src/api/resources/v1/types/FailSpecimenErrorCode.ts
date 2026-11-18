import * as core from '../../../../core';
import {
  SpecimenErrorCode,
  specimenErrorCode,
  specimenErrorCodeRequest,
  specimenErrorCodeResponse,
} from './SpecimenErrorCode';

export interface FailSpecimenErrorCode {
  failed_reasons: SpecimenErrorCode[];
}

/**
 * Cast schema for the FailSpecimenErrorCode model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const failSpecimenErrorCode = core.cast.identity<FailSpecimenErrorCode>();

/**
 * Cast schema for mapping API responses to the FailSpecimenErrorCode application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const failSpecimenErrorCodeResponse = core.cast.object(
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
 * Cast schema for mapping the FailSpecimenErrorCode application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const failSpecimenErrorCodeRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);
