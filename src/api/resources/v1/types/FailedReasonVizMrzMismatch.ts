import * as core from '../../../../core';

export const FailedReasonVizMrzMismatch = {
  VizMrzMismatch: 'VIZ_MRZ_MISMATCH',
} as const;

export type FailedReasonVizMrzMismatch =
  (typeof FailedReasonVizMrzMismatch)[keyof typeof FailedReasonVizMrzMismatch];

export const failedReasonVizMrzMismatch = core.cast.identity<FailedReasonVizMrzMismatch>();
