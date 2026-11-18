import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailPassCardFailedReason as _FailPassCardFailedReason,
  failPassCardFailedReason,
  failPassCardFailedReasonRequest,
  failPassCardFailedReasonResponse,
} from './FailPassCardFailedReason';

/**
 * Cast schema for the CheckPassCardFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkPassCardFailedReason = core.cast.identity<CheckPassCardFailedReason>();

export type CheckPassCardFailedReason =
  | CheckPassCardFailedReason.Pass
  | CheckPassCardFailedReason.Fail;

export namespace CheckPassCardFailedReason {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailPassCardFailedReason {
    status: 'fail';
  }
}

export const checkPassCardFailedReasonResponse = core.cast.identity<CheckPassCardFailedReason>();

export const checkPassCardFailedReasonRequest = core.cast.identity<CheckPassCardFailedReason>();
