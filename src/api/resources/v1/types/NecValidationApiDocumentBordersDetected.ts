import * as core from '../../../../core';
import {
  NecValidationApiDocumentBordersDetectedStatus,
  necValidationApiDocumentBordersDetectedStatus,
} from './NecValidationApiDocumentBordersDetectedStatus';

/**
 * Whether the correct document dimensions were detected (with score).
 */
export interface NecValidationApiDocumentBordersDetected {
  score: number | null;
  status: NecValidationApiDocumentBordersDetectedStatus;
}

export namespace NecValidationApiDocumentBordersDetected {
  export type Status = NecValidationApiDocumentBordersDetectedStatus;
  export const Status = NecValidationApiDocumentBordersDetectedStatus;
}

/**
 * Cast schema for the NecValidationApiDocumentBordersDetected model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const necValidationApiDocumentBordersDetected =
  core.cast.identity<NecValidationApiDocumentBordersDetected>();

/**
 * Cast schema for mapping API responses to the NecValidationApiDocumentBordersDetected application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const necValidationApiDocumentBordersDetectedResponse = core.cast.object(
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
 * Cast schema for mapping the NecValidationApiDocumentBordersDetected application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const necValidationApiDocumentBordersDetectedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
