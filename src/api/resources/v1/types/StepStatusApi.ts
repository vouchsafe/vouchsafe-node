import * as core from '../../../../core';

export const StepStatusApi = {
  Pass: 'pass',
  Fail: 'fail',
  InProgress: 'in_progress',
} as const;

export type StepStatusApi = (typeof StepStatusApi)[keyof typeof StepStatusApi];

export const stepStatusApi = core.cast.identity<StepStatusApi>();
