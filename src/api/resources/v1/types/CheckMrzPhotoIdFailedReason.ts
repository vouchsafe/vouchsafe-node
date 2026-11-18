import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailMrzPhotoIdFailedReason as _FailMrzPhotoIdFailedReason,
  failMrzPhotoIdFailedReason,
  failMrzPhotoIdFailedReasonRequest,
  failMrzPhotoIdFailedReasonResponse,
} from './FailMrzPhotoIdFailedReason';

/**
 * Cast schema for the CheckMrzPhotoIdFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkMrzPhotoIdFailedReason = core.cast.identity<CheckMrzPhotoIdFailedReason>();

export type CheckMrzPhotoIdFailedReason =
  | CheckMrzPhotoIdFailedReason.Pass
  | CheckMrzPhotoIdFailedReason.Fail;

export namespace CheckMrzPhotoIdFailedReason {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailMrzPhotoIdFailedReason {
    status: 'fail';
  }
}

export const checkMrzPhotoIdFailedReasonResponse =
  core.cast.identity<CheckMrzPhotoIdFailedReason>();

export const checkMrzPhotoIdFailedReasonRequest = core.cast.identity<CheckMrzPhotoIdFailedReason>();
