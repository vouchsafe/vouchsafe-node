import * as core from '../../../../core';

export const AccountResponseObject = {
  Account: 'account',
} as const;

export type AccountResponseObject =
  (typeof AccountResponseObject)[keyof typeof AccountResponseObject];

export const accountResponseObject = core.cast.identity<AccountResponseObject>();
