import * as core from '../../../../core';

export const ImmigrationStatusApiValidationStatus = {
  Pass: 'pass',
  Fail: 'fail',
  Inconclusive: 'inconclusive',
} as const;

export type ImmigrationStatusApiValidationStatus =
  (typeof ImmigrationStatusApiValidationStatus)[keyof typeof ImmigrationStatusApiValidationStatus];

export const immigrationStatusApiValidationStatus =
  core.cast.identity<ImmigrationStatusApiValidationStatus>();
