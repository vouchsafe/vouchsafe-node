import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailSpecimenErrorCode as _FailSpecimenErrorCode,
  failSpecimenErrorCode,
  failSpecimenErrorCodeRequest,
  failSpecimenErrorCodeResponse,
} from './FailSpecimenErrorCode';

/**
 * Cast schema for the CheckSpecimenErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkSpecimenErrorCode = core.cast.identity<CheckSpecimenErrorCode>();

export type CheckSpecimenErrorCode = CheckSpecimenErrorCode.Pass | CheckSpecimenErrorCode.Fail;

export namespace CheckSpecimenErrorCode {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailSpecimenErrorCode {
    status: 'fail';
  }
}

export const checkSpecimenErrorCodeResponse = core.cast.identity<CheckSpecimenErrorCode>();

export const checkSpecimenErrorCodeRequest = core.cast.identity<CheckSpecimenErrorCode>();
