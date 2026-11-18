import * as core from '../../../../core';

export const PersonalRelationshipApi = {
  Friend: 'friend',
  Colleague: 'colleague',
  Caseworker: 'caseworker',
  Relative: 'relative',
} as const;

export type PersonalRelationshipApi =
  (typeof PersonalRelationshipApi)[keyof typeof PersonalRelationshipApi];

export const personalRelationshipApi = core.cast.identity<PersonalRelationshipApi>();
