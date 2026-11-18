import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailTamperingErrorCode as _FailTamperingErrorCode,
  failTamperingErrorCode,
  failTamperingErrorCodeRequest,
  failTamperingErrorCodeResponse,
} from './FailTamperingErrorCode';

/**
 * Cast schema for the CheckTamperingErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkTamperingErrorCode = core.cast.identity<CheckTamperingErrorCode>();

export type CheckTamperingErrorCode = CheckTamperingErrorCode.Pass | CheckTamperingErrorCode.Fail;

export namespace CheckTamperingErrorCode {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailTamperingErrorCode {
    status: 'fail';
  }
}

export const checkTamperingErrorCodeResponse = core.cast.identity<CheckTamperingErrorCode>();

export const checkTamperingErrorCodeRequest = core.cast.identity<CheckTamperingErrorCode>();
