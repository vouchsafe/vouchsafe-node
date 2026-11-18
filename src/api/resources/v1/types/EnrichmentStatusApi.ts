import * as core from '../../../../core';

export const EnrichmentStatusApi = {
  Pass: 'pass',
  Fail: 'fail',
  Error: 'error',
} as const;

export type EnrichmentStatusApi = (typeof EnrichmentStatusApi)[keyof typeof EnrichmentStatusApi];

export const enrichmentStatusApi = core.cast.identity<EnrichmentStatusApi>();
