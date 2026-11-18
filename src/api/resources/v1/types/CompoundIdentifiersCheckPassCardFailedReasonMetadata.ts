import * as core from '../../../../core';

export interface CompoundIdentifiersCheckPassCardFailedReasonMetadata {
  mismatches: unknown;
}

/**
 * Cast schema for the CompoundIdentifiersCheckPassCardFailedReasonMetadata model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const compoundIdentifiersCheckPassCardFailedReasonMetadata =
  core.cast.identity<CompoundIdentifiersCheckPassCardFailedReasonMetadata>();

/**
 * Cast schema for mapping API responses to the CompoundIdentifiersCheckPassCardFailedReasonMetadata application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckPassCardFailedReasonMetadataResponse = core.cast.object(
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
 * Cast schema for mapping the CompoundIdentifiersCheckPassCardFailedReasonMetadata application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckPassCardFailedReasonMetadataRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { mismatches: raw['mismatches'] };
  },
  ['mismatches'],
);
