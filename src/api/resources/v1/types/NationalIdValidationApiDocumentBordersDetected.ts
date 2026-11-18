import * as core from '../../../../core';
import {
  NationalIdValidationApiDocumentBordersDetectedStatus,
  nationalIdValidationApiDocumentBordersDetectedStatus,
} from './NationalIdValidationApiDocumentBordersDetectedStatus';

/**
 * Whether the correct document dimensions were detected (with score).
 */
export interface NationalIdValidationApiDocumentBordersDetected {
  score: number | null;
  status: NationalIdValidationApiDocumentBordersDetectedStatus;
}

export namespace NationalIdValidationApiDocumentBordersDetected {
  export type Status = NationalIdValidationApiDocumentBordersDetectedStatus;
  export const Status = NationalIdValidationApiDocumentBordersDetectedStatus;
}

/**
 * Cast schema for the NationalIdValidationApiDocumentBordersDetected model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const nationalIdValidationApiDocumentBordersDetected =
  core.cast.identity<NationalIdValidationApiDocumentBordersDetected>();

/**
 * Cast schema for mapping API responses to the NationalIdValidationApiDocumentBordersDetected application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const nationalIdValidationApiDocumentBordersDetectedResponse = core.cast.object(
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
 * Cast schema for mapping the NationalIdValidationApiDocumentBordersDetected application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const nationalIdValidationApiDocumentBordersDetectedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
