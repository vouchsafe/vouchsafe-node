import * as core from '../../../../core';

export const FailedReasonSampleMrzCodeDetected = {
  SampleMrzCodeDetected: 'SAMPLE_MRZ_CODE_DETECTED',
} as const;

export type FailedReasonSampleMrzCodeDetected =
  (typeof FailedReasonSampleMrzCodeDetected)[keyof typeof FailedReasonSampleMrzCodeDetected];

export const failedReasonSampleMrzCodeDetected =
  core.cast.identity<FailedReasonSampleMrzCodeDetected>();
