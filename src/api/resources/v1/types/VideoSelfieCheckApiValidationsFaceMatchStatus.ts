import * as core from '../../../../core';

export const VideoSelfieCheckApiValidationsFaceMatchStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type VideoSelfieCheckApiValidationsFaceMatchStatus =
  (typeof VideoSelfieCheckApiValidationsFaceMatchStatus)[keyof typeof VideoSelfieCheckApiValidationsFaceMatchStatus];

export const videoSelfieCheckApiValidationsFaceMatchStatus =
  core.cast.identity<VideoSelfieCheckApiValidationsFaceMatchStatus>();
