import * as core from '../../../../core';
import { CheckResult, checkResult, checkResultRequest, checkResultResponse } from './CheckResult';

export interface OnlineFootprintChecks {
  PHONE_SCORE?: CheckResult;
  EMAIL_SCORE?: CheckResult;
}

/**
 * Cast schema for the OnlineFootprintChecks model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const onlineFootprintChecks = core.cast.identity<OnlineFootprintChecks>();

/**
 * Cast schema for mapping API responses to the OnlineFootprintChecks application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const onlineFootprintChecksResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['PHONE_SCORE', 'EMAIL_SCORE']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    PHONE_SCORE:
      raw['PHONE_SCORE'] == null
        ? raw['PHONE_SCORE']
        : checkResultResponse.parse(raw['PHONE_SCORE']),
    EMAIL_SCORE:
      raw['EMAIL_SCORE'] == null
        ? raw['EMAIL_SCORE']
        : checkResultResponse.parse(raw['EMAIL_SCORE']),
  };
}, []);

/**
 * Cast schema for mapping the OnlineFootprintChecks application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const onlineFootprintChecksRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    PHONE_SCORE:
      raw['PHONE_SCORE'] == null
        ? raw['PHONE_SCORE']
        : checkResultRequest.parse(raw['PHONE_SCORE']),
    EMAIL_SCORE:
      raw['EMAIL_SCORE'] == null
        ? raw['EMAIL_SCORE']
        : checkResultRequest.parse(raw['EMAIL_SCORE']),
  };
}, []);
