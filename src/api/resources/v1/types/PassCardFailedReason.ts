import * as core from '../../../../core';
import {
  FailedReasonIssuerMatchNotFound,
  failedReasonIssuerMatchNotFound,
} from './FailedReasonIssuerMatchNotFound';
import {
  FailedReasonPartialExtraction,
  failedReasonPartialExtraction,
} from './FailedReasonPartialExtraction';
import {
  FailedReasonInvalidCardNumber,
  failedReasonInvalidCardNumber,
} from './FailedReasonInvalidCardNumber';
import {
  FailedReasonVizDoesNotMatchApi,
  failedReasonVizDoesNotMatchApi,
} from './FailedReasonVizDoesNotMatchApi';
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
 * Cast schema for the PassCardFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const passCardFailedReason = core.cast.identity<PassCardFailedReason>();

export type PassCardFailedReason =
  | FailedReasonIssuerMatchNotFound
  | FailedReasonPartialExtraction
  | FailedReasonInvalidCardNumber
  | FailedReasonVizDoesNotMatchApi
  | FailedReasonExpiryDatePassed
  | FailedReasonDocumentPastExpiryWindow
  | FailedReasonInvalidDocumentDateFormat;

export const passCardFailedReasonResponse = core.cast.identity<PassCardFailedReason>();

export const passCardFailedReasonRequest = core.cast.identity<PassCardFailedReason>();
