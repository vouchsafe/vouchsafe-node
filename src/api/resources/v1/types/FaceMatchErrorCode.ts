import * as core from '../../../../core';
import {
  FailedReasonLowIdFaceMatch,
  failedReasonLowIdFaceMatch,
} from './FailedReasonLowIdFaceMatch';
import {
  FailedReasonMediumIdFaceMatch,
  failedReasonMediumIdFaceMatch,
} from './FailedReasonMediumIdFaceMatch';

/**
 * Cast schema for the FaceMatchErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const faceMatchErrorCode = core.cast.identity<FaceMatchErrorCode>();

export type FaceMatchErrorCode = FailedReasonLowIdFaceMatch | FailedReasonMediumIdFaceMatch;

export const faceMatchErrorCodeResponse = core.cast.identity<FaceMatchErrorCode>();

export const faceMatchErrorCodeRequest = core.cast.identity<FaceMatchErrorCode>();
