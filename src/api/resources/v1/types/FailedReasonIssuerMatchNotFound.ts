import * as core from '../../../../core';

export const FailedReasonIssuerMatchNotFound = {
  IssuerMatchNotFound: 'ISSUER_MATCH_NOT_FOUND',
} as const;

export type FailedReasonIssuerMatchNotFound =
  (typeof FailedReasonIssuerMatchNotFound)[keyof typeof FailedReasonIssuerMatchNotFound];

export const failedReasonIssuerMatchNotFound =
  core.cast.identity<FailedReasonIssuerMatchNotFound>();
