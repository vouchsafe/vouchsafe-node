import * as core from '../../../../core';
import { Pass as _Pass, pass, passRequest, passResponse } from './Pass';
import {
  FailDocumentFaceErrorCode as _FailDocumentFaceErrorCode,
  failDocumentFaceErrorCode,
  failDocumentFaceErrorCodeRequest,
  failDocumentFaceErrorCodeResponse,
} from './FailDocumentFaceErrorCode';

/**
 * Cast schema for the CheckDocumentFaceErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const checkDocumentFaceErrorCode = core.cast.identity<CheckDocumentFaceErrorCode>();

export type CheckDocumentFaceErrorCode =
  | CheckDocumentFaceErrorCode.Pass
  | CheckDocumentFaceErrorCode.Fail;

export namespace CheckDocumentFaceErrorCode {
  export interface Pass extends _Pass {
    status: 'pass';
  }
  export interface Fail extends _FailDocumentFaceErrorCode {
    status: 'fail';
  }
}

export const checkDocumentFaceErrorCodeResponse = core.cast.identity<CheckDocumentFaceErrorCode>();

export const checkDocumentFaceErrorCodeRequest = core.cast.identity<CheckDocumentFaceErrorCode>();
