import * as core from '../../../../core';

export type Pass = {};

/**
 * Cast schema for the Pass model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const pass = core.cast.identity<Pass>();

/**
 * Cast schema for mapping API responses to the Pass application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const passResponse = core.cast.object((raw: any): any => {
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
 * Cast schema for mapping the Pass application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const passRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {};
}, []);
