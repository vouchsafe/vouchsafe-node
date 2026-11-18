import * as core from '../../../../core';
import {
  DrivingLicenceFailedReason,
  drivingLicenceFailedReason,
  drivingLicenceFailedReasonRequest,
  drivingLicenceFailedReasonResponse,
} from './DrivingLicenceFailedReason';

export interface FailDrivingLicenceFailedReason {
  failed_reasons: DrivingLicenceFailedReason[];
}

/**
 * Cast schema for the FailDrivingLicenceFailedReason model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const failDrivingLicenceFailedReason = core.cast.identity<FailDrivingLicenceFailedReason>();

/**
 * Cast schema for mapping API responses to the FailDrivingLicenceFailedReason application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const failDrivingLicenceFailedReasonResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['failed_reasons']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);

/**
 * Cast schema for mapping the FailDrivingLicenceFailedReason application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const failDrivingLicenceFailedReasonRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);
