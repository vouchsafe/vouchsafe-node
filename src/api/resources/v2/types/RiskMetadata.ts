import * as core from '../../../../core';
import {
  RiskMetadataThresholds,
  riskMetadataThresholds,
  riskMetadataThresholdsRequest,
  riskMetadataThresholdsResponse,
} from './RiskMetadataThresholds';

export interface RiskMetadata {
  /** Effective score thresholds used for the optional enrichment checks. */
  thresholds?: RiskMetadataThresholds;
}

export namespace RiskMetadata {
  export interface Thresholds {
    aml: RiskMetadataThresholds['aml'];
    online_footprint: RiskMetadataThresholds['online_footprint'];
  }
}

/**
 * Cast schema for the RiskMetadata model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const riskMetadata = core.cast.identity<RiskMetadata>();

/**
 * Cast schema for mapping API responses to the RiskMetadata application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const riskMetadataResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['thresholds']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    thresholds:
      raw['thresholds'] == null
        ? raw['thresholds']
        : riskMetadataThresholdsResponse.parse(raw['thresholds']),
  };
}, []);

/**
 * Cast schema for mapping the RiskMetadata application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const riskMetadataRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    thresholds:
      raw['thresholds'] == null
        ? raw['thresholds']
        : riskMetadataThresholdsRequest.parse(raw['thresholds']),
  };
}, []);
