import * as core from '../../../../core';

export const ReviewUserCheckApiStep = {
  VerifyUser: 'verify_user',
} as const;

export type ReviewUserCheckApiStep =
  (typeof ReviewUserCheckApiStep)[keyof typeof ReviewUserCheckApiStep];

export const reviewUserCheckApiStep = core.cast.identity<ReviewUserCheckApiStep>();
