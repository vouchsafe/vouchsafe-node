import * as core from '../../../../core';
import { DocumentFaceErrorCode, documentFaceErrorCode } from './DocumentFaceErrorCode';

export interface FailDocumentFaceErrorCode {
  failed_reasons: DocumentFaceErrorCode[];
}

/**
 * Cast schema for the FailDocumentFaceErrorCode model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const failDocumentFaceErrorCode = core.cast.identity<FailDocumentFaceErrorCode>();

/**
 * Cast schema for mapping API responses to the FailDocumentFaceErrorCode application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const failDocumentFaceErrorCodeResponse = core.cast.object(
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
 * Cast schema for mapping the FailDocumentFaceErrorCode application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const failDocumentFaceErrorCodeRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);
