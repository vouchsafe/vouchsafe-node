import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailDrivingLicenceFailedReason as _FailDrivingLicenceFailedReason,
  failDrivingLicenceFailedReason,
  failDrivingLicenceFailedReasonRequest,
  failDrivingLicenceFailedReasonResponse,
} from './FailDrivingLicenceFailedReason';

/**
 * Cast schema for the CheckDrivingLicenceFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkDrivingLicenceFailedReason =
  core.cast.identity<CheckDrivingLicenceFailedReason>();

export type CheckDrivingLicenceFailedReason =
  | CheckDrivingLicenceFailedReason.Pass
  | CheckDrivingLicenceFailedReason.Fail;

export namespace CheckDrivingLicenceFailedReason {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailDrivingLicenceFailedReason {
    status: 'fail';
  }
}

export const checkDrivingLicenceFailedReasonResponse =
  core.cast.identity<CheckDrivingLicenceFailedReason>();

export const checkDrivingLicenceFailedReasonRequest =
  core.cast.identity<CheckDrivingLicenceFailedReason>();
