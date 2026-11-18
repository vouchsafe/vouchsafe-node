import * as core from '../../../../core';

export const CaseStatus = {
  InProgress: 'InProgress',
  ReadyForReview: 'ReadyForReview',
  Verified: 'Verified',
  Refused: 'Refused',
  Cancelled: 'Cancelled',
  LockedOut: 'LockedOut',
  Blocked: 'Blocked',
  ManuallyReviewed: 'ManuallyReviewed',
} as const;

export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus];

export const caseStatus = core.cast.identity<CaseStatus>();
