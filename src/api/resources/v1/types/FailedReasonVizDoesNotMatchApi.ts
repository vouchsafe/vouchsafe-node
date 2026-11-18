import * as core from '../../../../core';

export const FailedReasonVizDoesNotMatchApi = {
  VizDoesNotMatchApi: 'VIZ_DOES_NOT_MATCH_API',
} as const;

export type FailedReasonVizDoesNotMatchApi =
  (typeof FailedReasonVizDoesNotMatchApi)[keyof typeof FailedReasonVizDoesNotMatchApi];

export const failedReasonVizDoesNotMatchApi = core.cast.identity<FailedReasonVizDoesNotMatchApi>();
