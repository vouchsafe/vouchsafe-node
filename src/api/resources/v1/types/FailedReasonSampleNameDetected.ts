import * as core from '../../../../core';

export const FailedReasonSampleNameDetected = {
  SampleNameDetected: 'SAMPLE_NAME_DETECTED',
} as const;

export type FailedReasonSampleNameDetected =
  (typeof FailedReasonSampleNameDetected)[keyof typeof FailedReasonSampleNameDetected];

export const failedReasonSampleNameDetected = core.cast.identity<FailedReasonSampleNameDetected>();
