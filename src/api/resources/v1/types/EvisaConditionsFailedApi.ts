import * as core from '../../../../core';
import {
  EvisaConditionsFailedApiExtractionSuccess,
  evisaConditionsFailedApiExtractionSuccess,
} from './EvisaConditionsFailedApiExtractionSuccess';

export interface EvisaConditionsFailedApi {
  extraction_success: EvisaConditionsFailedApiExtractionSuccess;
}

export namespace EvisaConditionsFailedApi {
  export type ExtractionSuccess = EvisaConditionsFailedApiExtractionSuccess;
}

/**
 * Cast schema for the EvisaConditionsFailedApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaConditionsFailedApi = core.cast.identity<EvisaConditionsFailedApi>();

/**
 * Cast schema for mapping API responses to the EvisaConditionsFailedApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaConditionsFailedApiResponse = core.cast.object(
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
 * Cast schema for mapping the EvisaConditionsFailedApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaConditionsFailedApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { extraction_success: raw['extraction_success'] };
  },
  ['extraction_success'],
);
