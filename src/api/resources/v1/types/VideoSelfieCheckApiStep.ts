import * as core from '../../../../core';

export const VideoSelfieCheckApiStep = {
  VideoSelfie: 'video_selfie',
} as const;

export type VideoSelfieCheckApiStep =
  (typeof VideoSelfieCheckApiStep)[keyof typeof VideoSelfieCheckApiStep];

export const videoSelfieCheckApiStep = core.cast.identity<VideoSelfieCheckApiStep>();
