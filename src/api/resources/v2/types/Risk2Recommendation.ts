import * as core from '../../../../core';

export const Risk2Recommendation = {
  Clear: 'CLEAR',
  Review: 'REVIEW',
  Reject: 'REJECT',
} as const;

export type Risk2Recommendation = (typeof Risk2Recommendation)[keyof typeof Risk2Recommendation];

export const risk2Recommendation = core.cast.identity<Risk2Recommendation>();
