import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData as _FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData,
  failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData,
  failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataRequest,
  failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataResponse,
} from './FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData';

/**
 * Cast schema for the CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData =
  core.cast.identity<CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData>();

export type CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData =
  | CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData.Pass
  | CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData.Fail;

export namespace CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData {
    status: 'fail';
  }
}

export const checkFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataResponse =
  core.cast.identity<CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData>();

export const checkFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataRequest =
  core.cast.identity<CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData>();
