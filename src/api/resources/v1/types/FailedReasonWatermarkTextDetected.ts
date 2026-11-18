import * as core from '../../../../core';

export const FailedReasonWatermarkTextDetected = {
  WatermarkTextDetected: 'WATERMARK_TEXT_DETECTED',
} as const;

export type FailedReasonWatermarkTextDetected =
  (typeof FailedReasonWatermarkTextDetected)[keyof typeof FailedReasonWatermarkTextDetected];

export const failedReasonWatermarkTextDetected =
  core.cast.identity<FailedReasonWatermarkTextDetected>();
