import * as core from '../../../../core';

export const PhotoIdVerificationResponseOutcome = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type PhotoIdVerificationResponseOutcome =
  (typeof PhotoIdVerificationResponseOutcome)[keyof typeof PhotoIdVerificationResponseOutcome];

export const photoIdVerificationResponseOutcome =
  core.cast.identity<PhotoIdVerificationResponseOutcome>();
