import * as core from '../../../../core';

export const VideoSelfieCheckApiValidationsLivenessCheckStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type VideoSelfieCheckApiValidationsLivenessCheckStatus =
  (typeof VideoSelfieCheckApiValidationsLivenessCheckStatus)[keyof typeof VideoSelfieCheckApiValidationsLivenessCheckStatus];

export const videoSelfieCheckApiValidationsLivenessCheckStatus =
  core.cast.identity<VideoSelfieCheckApiValidationsLivenessCheckStatus>();
