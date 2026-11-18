import * as core from '../../../../core';
import {
  FailedReasonIncompleteMrzData,
  failedReasonIncompleteMrzData,
} from './FailedReasonIncompleteMrzData';
import {
  FailedReasonInvalidMrzCode,
  failedReasonInvalidMrzCode,
} from './FailedReasonInvalidMrzCode';
import {
  FailedReasonVizMrzMismatch,
  failedReasonVizMrzMismatch,
} from './FailedReasonVizMrzMismatch';
import {
  FailedReasonInvalidDocumentDateFormat,
  failedReasonInvalidDocumentDateFormat,
} from './FailedReasonInvalidDocumentDateFormat';
import {
  FailedReasonExpiryDatePassed,
  failedReasonExpiryDatePassed,
} from './FailedReasonExpiryDatePassed';
import {
  FailedReasonDocumentPastExpiryWindow,
  failedReasonDocumentPastExpiryWindow,
} from './FailedReasonDocumentPastExpiryWindow';

/**
 * Cast schema for the MrzPhotoIdFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const mrzPhotoIdFailedReason = core.cast.identity<MrzPhotoIdFailedReason>();

export type MrzPhotoIdFailedReason =
  | FailedReasonIncompleteMrzData
  | FailedReasonInvalidMrzCode
  | FailedReasonVizMrzMismatch
  | FailedReasonInvalidDocumentDateFormat
  | FailedReasonExpiryDatePassed
  | FailedReasonDocumentPastExpiryWindow;

export const mrzPhotoIdFailedReasonResponse = core.cast.identity<MrzPhotoIdFailedReason>();

export const mrzPhotoIdFailedReasonRequest = core.cast.identity<MrzPhotoIdFailedReason>();
