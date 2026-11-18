import * as core from '../../../../core';
import {
  EvisaConditionsSuccessApiExtractionSuccess,
  evisaConditionsSuccessApiExtractionSuccess,
} from './EvisaConditionsSuccessApiExtractionSuccess';

export interface EvisaConditionsSuccessApi {
  extraction_success: EvisaConditionsSuccessApiExtractionSuccess;
  max_weekly_hours: string | null;
  no_self_employment: string | null;
}

export namespace EvisaConditionsSuccessApi {
  export type ExtractionSuccess = EvisaConditionsSuccessApiExtractionSuccess;
}

/**
 * Cast schema for the EvisaConditionsSuccessApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaConditionsSuccessApi = core.cast.identity<EvisaConditionsSuccessApi>();

/**
 * Cast schema for mapping API responses to the EvisaConditionsSuccessApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaConditionsSuccessApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'extraction_success',
      'max_weekly_hours',
      'no_self_employment',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      extraction_success: raw['extraction_success'],
      max_weekly_hours: raw['max_weekly_hours'],
      no_self_employment: raw['no_self_employment'],
    };
  },
  ['extraction_success', 'max_weekly_hours', 'no_self_employment'],
);

/**
 * Cast schema for mapping the EvisaConditionsSuccessApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaConditionsSuccessApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      extraction_success: raw['extraction_success'],
      max_weekly_hours: raw['max_weekly_hours'],
      no_self_employment: raw['no_self_employment'],
    };
  },
  ['extraction_success', 'max_weekly_hours', 'no_self_employment'],
);
