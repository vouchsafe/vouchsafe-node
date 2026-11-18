import * as core from '../../../../core';

export const FailedReasonMediumIdFaceMatch = {
  MediumIdFaceMatch: 'MEDIUM_ID_FACE_MATCH',
} as const;

export type FailedReasonMediumIdFaceMatch =
  (typeof FailedReasonMediumIdFaceMatch)[keyof typeof FailedReasonMediumIdFaceMatch];

export const failedReasonMediumIdFaceMatch = core.cast.identity<FailedReasonMediumIdFaceMatch>();
