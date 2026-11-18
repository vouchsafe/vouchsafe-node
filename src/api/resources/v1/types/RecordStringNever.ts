import * as core from '../../../../core';

/**
 * Construct a type with a set of properties K of type T
 */
export type RecordStringNever = {};

/**
 * Cast schema for the RecordStringNever model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const recordStringNever = core.cast.identity<RecordStringNever>();

/**
 * Cast schema for mapping API responses to the RecordStringNever application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const recordStringNeverResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([]);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return { ...__extras };
}, []);

/**
 * Cast schema for mapping the RecordStringNever application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const recordStringNeverRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {};
}, []);
