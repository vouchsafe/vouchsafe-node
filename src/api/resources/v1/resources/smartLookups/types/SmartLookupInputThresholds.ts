import * as core from '../../../../../../core';

/**
 * (conditionally required) — Used to set a threshold for OnlineFootprint and AML checks, otherwise defaulting to 50 and 96 for OnlineFootprint and AML respectively
 */
export interface SmartLookupInputThresholds {
  /** Minimum score required to pass AML check (0-100) */
  aml?: number;
  /** Minimum score required to pass online footprint check (0-100) */
  onlineFootprint?: number;
}

/**
 * Cast schema for the SmartLookupInputThresholds model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const smartLookupInputThresholds = core.cast.identity<SmartLookupInputThresholds>();

/**
 * Cast schema for mapping API responses to the SmartLookupInputThresholds application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const smartLookupInputThresholdsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['aml', 'onlineFootprint']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return { ...__extras, aml: raw['aml'], onlineFootprint: raw['onlineFootprint'] };
}, []);

/**
 * Cast schema for mapping the SmartLookupInputThresholds application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const smartLookupInputThresholdsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return { aml: raw['aml'], onlineFootprint: raw['onlineFootprint'] };
}, []);
