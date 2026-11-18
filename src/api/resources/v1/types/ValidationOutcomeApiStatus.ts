import * as core from '../../../../core';

export const ValidationOutcomeApiStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type ValidationOutcomeApiStatus =
  (typeof ValidationOutcomeApiStatus)[keyof typeof ValidationOutcomeApiStatus];

export const validationOutcomeApiStatus = core.cast.identity<ValidationOutcomeApiStatus>();
