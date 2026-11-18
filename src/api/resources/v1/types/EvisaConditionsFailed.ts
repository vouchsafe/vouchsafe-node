import * as core from '../../../../core';
import {
  EvisaConditionsFailedExtractionSuccess,
  evisaConditionsFailedExtractionSuccess,
} from './EvisaConditionsFailedExtractionSuccess';

export interface EvisaConditionsFailed {
  extraction_success: EvisaConditionsFailedExtractionSuccess;
}

export namespace EvisaConditionsFailed {
  export type ExtractionSuccess = EvisaConditionsFailedExtractionSuccess;
}

/**
 * Cast schema for the EvisaConditionsFailed model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaConditionsFailed = core.cast.identity<EvisaConditionsFailed>();

/**
 * Cast schema for mapping API responses to the EvisaConditionsFailed application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaConditionsFailedResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['extraction_success']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, extraction_success: raw['extraction_success'] };
  },
  ['extraction_success'],
);

/**
 * Cast schema for mapping the EvisaConditionsFailed application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaConditionsFailedRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { extraction_success: raw['extraction_success'] };
  },
  ['extraction_success'],
);
