import * as core from '../../../../core';

export const ApiValidationStatus = {
  Pass: 'pass',
  Fail: 'fail',
} as const;

export type ApiValidationStatus = (typeof ApiValidationStatus)[keyof typeof ApiValidationStatus];

export const apiValidationStatus = core.cast.identity<ApiValidationStatus>();
