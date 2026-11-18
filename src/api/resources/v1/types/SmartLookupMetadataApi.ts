import * as core from '../../../../core';
import {
  SmartLookupMetadataApiThresholds,
  smartLookupMetadataApiThresholds,
  smartLookupMetadataApiThresholdsRequest,
  smartLookupMetadataApiThresholdsResponse,
} from './SmartLookupMetadataApiThresholds';
import { RecordStringUnknown_ } from '../../../types/RecordStringUnknown_';

export interface SmartLookupMetadataApi {
  /** The thresholds used for aml and onlineFootprint checks. Defaults to aml: 96, onlineFootprint: 50 */
  thresholds: SmartLookupMetadataApiThresholds;
  /** Whether tokens were charged for this lookup. False when served entirely from the 4-hour cache. Defaults to true for lookups predating this field. */
  billable?: boolean;
  /** Construct a type with a set of properties K of type T */
  creditBureauVerification?: RecordStringUnknown_;
  /** Construct a type with a set of properties K of type T */
  onlineFootprintVerification?: RecordStringUnknown_;
  /** Construct a type with a set of properties K of type T */
  amlVerification?: RecordStringUnknown_;
}

export namespace SmartLookupMetadataApi {
  export interface Thresholds {
    onlineFootprint: SmartLookupMetadataApiThresholds['onlineFootprint'];
    aml: SmartLookupMetadataApiThresholds['aml'];
  }
}

/**
 * Cast schema for the SmartLookupMetadataApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const smartLookupMetadataApi = core.cast.identity<SmartLookupMetadataApi>();

/**
 * Cast schema for mapping API responses to the SmartLookupMetadataApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const smartLookupMetadataApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'thresholds',
      'billable',
      'creditBureauVerification',
      'onlineFootprintVerification',
      'amlVerification',
    ]);
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
          : smartLookupMetadataApiThresholdsResponse.parse(raw['thresholds']),
      billable: raw['billable'],
      creditBureauVerification: raw['creditBureauVerification'],
      onlineFootprintVerification: raw['onlineFootprintVerification'],
      amlVerification: raw['amlVerification'],
    };
  },
  ['thresholds'],
);

/**
 * Cast schema for mapping the SmartLookupMetadataApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const smartLookupMetadataApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      thresholds:
        raw['thresholds'] == null
          ? raw['thresholds']
          : smartLookupMetadataApiThresholdsRequest.parse(raw['thresholds']),
      billable: raw['billable'],
      creditBureauVerification: raw['creditBureauVerification'],
      onlineFootprintVerification: raw['onlineFootprintVerification'],
      amlVerification: raw['amlVerification'],
    };
  },
  ['thresholds'],
);
