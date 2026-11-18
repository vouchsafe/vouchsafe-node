import * as core from '../../../../core';
import {
  UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus,
  unfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus,
} from './UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus';

/**
 * Whether the correct document dimensions were detected (with score).
 */
export interface UnfamiliarPhotoIdValidationApiDocumentBordersDetected {
  score: number | null;
  status: UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus;
}

export namespace UnfamiliarPhotoIdValidationApiDocumentBordersDetected {
  export type Status = UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus;
  export const Status = UnfamiliarPhotoIdValidationApiDocumentBordersDetectedStatus;
}

/**
 * Cast schema for the UnfamiliarPhotoIdValidationApiDocumentBordersDetected model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const unfamiliarPhotoIdValidationApiDocumentBordersDetected =
  core.cast.identity<UnfamiliarPhotoIdValidationApiDocumentBordersDetected>();

/**
 * Cast schema for mapping API responses to the UnfamiliarPhotoIdValidationApiDocumentBordersDetected application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdValidationApiDocumentBordersDetectedResponse = core.cast.object(
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
 * Cast schema for mapping the UnfamiliarPhotoIdValidationApiDocumentBordersDetected application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdValidationApiDocumentBordersDetectedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
