import * as core from '../../../../core';
import {
  FailedReasonPartialExtraction,
  failedReasonPartialExtraction,
} from './FailedReasonPartialExtraction';
import {
  FailedReasonExpiryDatePassed,
  failedReasonExpiryDatePassed,
} from './FailedReasonExpiryDatePassed';
import {
  FailedReasonDocumentPastExpiryWindow,
  failedReasonDocumentPastExpiryWindow,
} from './FailedReasonDocumentPastExpiryWindow';
import {
  FailedReasonInvalidDocumentDateFormat,
  failedReasonInvalidDocumentDateFormat,
} from './FailedReasonInvalidDocumentDateFormat';

/**
 * Cast schema for the UnfamiliarPhotoIdFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const unfamiliarPhotoIdFailedReason = core.cast.identity<UnfamiliarPhotoIdFailedReason>();

export type UnfamiliarPhotoIdFailedReason =
  | FailedReasonPartialExtraction
  | FailedReasonExpiryDatePassed
  | FailedReasonDocumentPastExpiryWindow
  | FailedReasonInvalidDocumentDateFormat;

export const unfamiliarPhotoIdFailedReasonResponse =
  core.cast.identity<UnfamiliarPhotoIdFailedReason>();

export const unfamiliarPhotoIdFailedReasonRequest =
  core.cast.identity<UnfamiliarPhotoIdFailedReason>();
