import * as core from '../../../../core';

export const CoverageType = {
  DigitalId: 'DIGITAL_ID',
  PhotoId: 'PHOTO_ID',
  SupportingDocument: 'SUPPORTING_DOCUMENT',
  DataSource: 'DATA_SOURCE',
} as const;

export type CoverageType = (typeof CoverageType)[keyof typeof CoverageType];

export const coverageType = core.cast.identity<CoverageType>();
