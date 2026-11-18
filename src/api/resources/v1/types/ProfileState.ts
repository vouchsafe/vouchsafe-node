import * as core from '../../../../core';

export const ProfileState = {
  Met: 'met',
  Pending: 'pending',
  NotMet: 'not_met',
  Review: 'review',
} as const;

export type ProfileState = (typeof ProfileState)[keyof typeof ProfileState];

export const profileState = core.cast.identity<ProfileState>();
