import * as core from '../../../../core';

export const AlertAccountStatus = {
  New: 'new',
  Acknowledged: 'acknowledged',
  Clear: 'clear',
} as const;

export type AlertAccountStatus = (typeof AlertAccountStatus)[keyof typeof AlertAccountStatus];

export const alertAccountStatus = core.cast.identity<AlertAccountStatus>();
