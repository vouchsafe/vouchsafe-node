import * as core from '../../../../core';

export const CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus = {
  Fail: 'fail',
} as const;

export type CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus =
  (typeof CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus)[keyof typeof CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus];

export const compoundIdentifiersCheckMrzPhotoIdFailedReasonStatus =
  core.cast.identity<CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus>();
