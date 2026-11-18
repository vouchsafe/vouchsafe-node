import * as core from '../../../../core';

export const DocumentAgeValidFailedReason = {
  PartialExtraction: 'PARTIAL_EXTRACTION',
  InvalidDocumentDateFormat: 'INVALID_DOCUMENT_DATE_FORMAT',
  DocumentDateExceedsValidityPeriod: 'DOCUMENT_DATE_EXCEEDS_VALIDITY_PERIOD',
} as const;

export type DocumentAgeValidFailedReason =
  (typeof DocumentAgeValidFailedReason)[keyof typeof DocumentAgeValidFailedReason];

export const documentAgeValidFailedReason = core.cast.identity<DocumentAgeValidFailedReason>();
