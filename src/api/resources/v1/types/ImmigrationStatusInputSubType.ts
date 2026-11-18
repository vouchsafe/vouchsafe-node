import * as core from '../../../../core';

export const ImmigrationStatusInputSubType = {
  ImmigrationStatus: 'ImmigrationStatus',
} as const;

export type ImmigrationStatusInputSubType =
  (typeof ImmigrationStatusInputSubType)[keyof typeof ImmigrationStatusInputSubType];

export const immigrationStatusInputSubType = core.cast.identity<ImmigrationStatusInputSubType>();
