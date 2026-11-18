import * as core from '../../../../core';

export const FailedReasonNoFaceOnDocument = {
  NoFaceOnDocument: 'NO_FACE_ON_DOCUMENT',
} as const;

export type FailedReasonNoFaceOnDocument =
  (typeof FailedReasonNoFaceOnDocument)[keyof typeof FailedReasonNoFaceOnDocument];

export const failedReasonNoFaceOnDocument = core.cast.identity<FailedReasonNoFaceOnDocument>();
