import * as core from '../../../../core';

export const FailedReasonLowIdFaceMatch = {
  LowIdFaceMatch: 'LOW_ID_FACE_MATCH',
} as const;

export type FailedReasonLowIdFaceMatch =
  (typeof FailedReasonLowIdFaceMatch)[keyof typeof FailedReasonLowIdFaceMatch];

export const failedReasonLowIdFaceMatch = core.cast.identity<FailedReasonLowIdFaceMatch>();
