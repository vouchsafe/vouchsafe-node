import * as core from '../../../../core';

/**
 * Effective score thresholds used for the optional enrichment checks.
 */
export interface Risk2MetadataThresholds {
  /** AML pass/fail threshold (0–100). Default: 96. */
  aml: number;
  /** Online footprint pass/fail threshold (0–100). Default: 50. */
  online_footprint: number;
}

/**
 * Cast schema for the Risk2MetadataThresholds model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2MetadataThresholds = core.cast.identity<Risk2MetadataThresholds>();

/**
 * Cast schema for mapping API responses to the Risk2MetadataThresholds application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2MetadataThresholdsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['aml', 'online_footprint']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, aml: raw['aml'], online_footprint: raw['online_footprint'] };
  },
  ['aml', 'online_footprint'],
);

/**
 * Cast schema for mapping the Risk2MetadataThresholds application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2MetadataThresholdsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { aml: raw['aml'], online_footprint: raw['online_footprint'] };
  },
  ['aml', 'online_footprint'],
);
