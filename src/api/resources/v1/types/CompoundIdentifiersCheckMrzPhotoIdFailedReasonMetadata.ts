import * as core from '../../../../core';

export interface CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata {
  mismatches: unknown;
}

/**
 * Cast schema for the CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata =
  core.cast.identity<CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata>();

/**
 * Cast schema for mapping API responses to the CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadataResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['mismatches']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, mismatches: raw['mismatches'] };
  },
  ['mismatches'],
);

/**
 * Cast schema for mapping the CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadataRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { mismatches: raw['mismatches'] };
  },
  ['mismatches'],
);
