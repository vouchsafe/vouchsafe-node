import * as core from '../../../../core';

export const Recommendation = {
  Reject: 'REJECT',
  Review: 'REVIEW',
  Clear: 'CLEAR',
} as const;

export type Recommendation = (typeof Recommendation)[keyof typeof Recommendation];

export const recommendation = core.cast.identity<Recommendation>();
