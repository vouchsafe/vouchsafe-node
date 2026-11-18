import * as core from '../../../../core';

export const AdverseMediaResponseStatus = {
  Pass: 'PASS',
  Fail: 'FAIL',
} as const;

export type AdverseMediaResponseStatus =
  (typeof AdverseMediaResponseStatus)[keyof typeof AdverseMediaResponseStatus];

export const adverseMediaResponseStatus = core.cast.identity<AdverseMediaResponseStatus>();
