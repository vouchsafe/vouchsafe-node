import * as core from '../../../../core';

export const OnlineFootprintCheckResultReason = {
  InvalidPhoneFormat: 'INVALID_PHONE_FORMAT',
} as const;

export type OnlineFootprintCheckResultReason =
  (typeof OnlineFootprintCheckResultReason)[keyof typeof OnlineFootprintCheckResultReason];

export const onlineFootprintCheckResultReason =
  core.cast.identity<OnlineFootprintCheckResultReason>();
