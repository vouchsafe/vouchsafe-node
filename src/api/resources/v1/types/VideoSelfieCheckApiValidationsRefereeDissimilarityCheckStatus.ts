import * as core from '../../../../core';

export const VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus =
  (typeof VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus)[keyof typeof VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus];

export const videoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus =
  core.cast.identity<VideoSelfieCheckApiValidationsRefereeDissimilarityCheckStatus>();
