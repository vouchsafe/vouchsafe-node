import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData as _FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData,
  failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData,
  failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataRequest,
  failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataResponse,
} from './FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData';

/**
 * Cast schema for the CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData =
  core.cast.identity<CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData>();

export type CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData =
  | CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData.Pass
  | CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData.Fail;

export namespace CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData {
    status: 'fail';
  }
}

export const checkFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataResponse =
  core.cast.identity<CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData>();

export const checkFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataRequest =
  core.cast.identity<CheckFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData>();
