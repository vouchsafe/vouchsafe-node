import * as core from '../../../../core';

/**
 * The thresholds used for aml and onlineFootprint checks. Defaults to aml: 96, onlineFootprint: 50
 */
export interface SmartLookupMetadataApiThresholds {
  onlineFootprint: number;
  aml: number;
}

/**
 * Cast schema for the SmartLookupMetadataApiThresholds model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const smartLookupMetadataApiThresholds =
  core.cast.identity<SmartLookupMetadataApiThresholds>();

/**
 * Cast schema for mapping API responses to the SmartLookupMetadataApiThresholds application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const smartLookupMetadataApiThresholdsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['onlineFootprint', 'aml']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, onlineFootprint: raw['onlineFootprint'], aml: raw['aml'] };
  },
  ['onlineFootprint', 'aml'],
);

/**
 * Cast schema for mapping the SmartLookupMetadataApiThresholds application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const smartLookupMetadataApiThresholdsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { onlineFootprint: raw['onlineFootprint'], aml: raw['aml'] };
  },
  ['onlineFootprint', 'aml'],
);
