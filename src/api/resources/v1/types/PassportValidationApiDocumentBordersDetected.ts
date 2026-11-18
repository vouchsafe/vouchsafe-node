import * as core from '../../../../core';
import {
  PassportValidationApiDocumentBordersDetectedStatus,
  passportValidationApiDocumentBordersDetectedStatus,
} from './PassportValidationApiDocumentBordersDetectedStatus';

/**
 * Whether the correct document dimensions were detected (with score).
 */
export interface PassportValidationApiDocumentBordersDetected {
  score: number | null;
  status: PassportValidationApiDocumentBordersDetectedStatus;
}

export namespace PassportValidationApiDocumentBordersDetected {
  export type Status = PassportValidationApiDocumentBordersDetectedStatus;
  export const Status = PassportValidationApiDocumentBordersDetectedStatus;
}

/**
 * Cast schema for the PassportValidationApiDocumentBordersDetected model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const passportValidationApiDocumentBordersDetected =
  core.cast.identity<PassportValidationApiDocumentBordersDetected>();

/**
 * Cast schema for mapping API responses to the PassportValidationApiDocumentBordersDetected application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const passportValidationApiDocumentBordersDetectedResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['score', 'status']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);

/**
 * Cast schema for mapping the PassportValidationApiDocumentBordersDetected application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const passportValidationApiDocumentBordersDetectedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
