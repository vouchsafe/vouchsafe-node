import * as core from '../../../../core';

export const ScoreCheckFaceMatchErrorCodeStatus = {
  Fail: 'fail',
} as const;

export type ScoreCheckFaceMatchErrorCodeStatus =
  (typeof ScoreCheckFaceMatchErrorCodeStatus)[keyof typeof ScoreCheckFaceMatchErrorCodeStatus];

export const scoreCheckFaceMatchErrorCodeStatus =
  core.cast.identity<ScoreCheckFaceMatchErrorCodeStatus>();
