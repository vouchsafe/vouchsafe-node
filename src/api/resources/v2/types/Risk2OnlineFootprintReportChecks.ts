import * as core from '../../../../core';
import {
  OnlineFootprintCheckResult,
  onlineFootprintCheckResult,
  onlineFootprintCheckResultRequest,
  onlineFootprintCheckResultResponse,
} from './OnlineFootprintCheckResult';

export interface Risk2OnlineFootprintReportChecks {
  PHONE_SCORE?: OnlineFootprintCheckResult;
  EMAIL_SCORE?: OnlineFootprintCheckResult;
}

/**
 * Cast schema for the Risk2OnlineFootprintReportChecks model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2OnlineFootprintReportChecks =
  core.cast.identity<Risk2OnlineFootprintReportChecks>();

/**
 * Cast schema for mapping API responses to the Risk2OnlineFootprintReportChecks application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2OnlineFootprintReportChecksResponse = core.cast.object((raw: any): any => {
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
        : onlineFootprintCheckResultResponse.parse(raw['PHONE_SCORE']),
    EMAIL_SCORE:
      raw['EMAIL_SCORE'] == null
        ? raw['EMAIL_SCORE']
        : onlineFootprintCheckResultResponse.parse(raw['EMAIL_SCORE']),
  };
}, []);

/**
 * Cast schema for mapping the Risk2OnlineFootprintReportChecks application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2OnlineFootprintReportChecksRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    PHONE_SCORE:
      raw['PHONE_SCORE'] == null
        ? raw['PHONE_SCORE']
        : onlineFootprintCheckResultRequest.parse(raw['PHONE_SCORE']),
    EMAIL_SCORE:
      raw['EMAIL_SCORE'] == null
        ? raw['EMAIL_SCORE']
        : onlineFootprintCheckResultRequest.parse(raw['EMAIL_SCORE']),
  };
}, []);
