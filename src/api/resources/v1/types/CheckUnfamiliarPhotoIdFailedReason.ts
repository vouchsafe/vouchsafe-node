import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailUnfamiliarPhotoIdFailedReason as _FailUnfamiliarPhotoIdFailedReason,
  failUnfamiliarPhotoIdFailedReason,
  failUnfamiliarPhotoIdFailedReasonRequest,
  failUnfamiliarPhotoIdFailedReasonResponse,
} from './FailUnfamiliarPhotoIdFailedReason';

/**
 * Cast schema for the CheckUnfamiliarPhotoIdFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkUnfamiliarPhotoIdFailedReason =
  core.cast.identity<CheckUnfamiliarPhotoIdFailedReason>();

export type CheckUnfamiliarPhotoIdFailedReason =
  | CheckUnfamiliarPhotoIdFailedReason.Pass
  | CheckUnfamiliarPhotoIdFailedReason.Fail;

export namespace CheckUnfamiliarPhotoIdFailedReason {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailUnfamiliarPhotoIdFailedReason {
    status: 'fail';
  }
}

export const checkUnfamiliarPhotoIdFailedReasonResponse =
  core.cast.identity<CheckUnfamiliarPhotoIdFailedReason>();

export const checkUnfamiliarPhotoIdFailedReasonRequest =
  core.cast.identity<CheckUnfamiliarPhotoIdFailedReason>();
