import * as core from '../../../../core';
import {
  Risk2MetadataThresholds,
  risk2MetadataThresholds,
  risk2MetadataThresholdsRequest,
  risk2MetadataThresholdsResponse,
} from './Risk2MetadataThresholds';

export interface Risk2Metadata {
  /** Effective score thresholds used for the optional enrichment checks. */
  thresholds: Risk2MetadataThresholds;
}

export namespace Risk2Metadata {
  export interface Thresholds {
    aml: Risk2MetadataThresholds['aml'];
    online_footprint: Risk2MetadataThresholds['online_footprint'];
  }
}

/**
 * Cast schema for the Risk2Metadata model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2Metadata = core.cast.identity<Risk2Metadata>();

/**
 * Cast schema for mapping API responses to the Risk2Metadata application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2MetadataResponse = core.cast.object(
  (raw: any): any => {
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
          : risk2MetadataThresholdsResponse.parse(raw['thresholds']),
    };
  },
  ['thresholds'],
);

/**
 * Cast schema for mapping the Risk2Metadata application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2MetadataRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      thresholds:
        raw['thresholds'] == null
          ? raw['thresholds']
          : risk2MetadataThresholdsRequest.parse(raw['thresholds']),
    };
  },
  ['thresholds'],
);
