import * as core from '../../../../core';

export const ScoreCheckDocumentDimensionsErrorCodeStatus = {
  Fail: 'fail',
} as const;

export type ScoreCheckDocumentDimensionsErrorCodeStatus =
  (typeof ScoreCheckDocumentDimensionsErrorCodeStatus)[keyof typeof ScoreCheckDocumentDimensionsErrorCodeStatus];

export const scoreCheckDocumentDimensionsErrorCodeStatus =
  core.cast.identity<ScoreCheckDocumentDimensionsErrorCodeStatus>();
