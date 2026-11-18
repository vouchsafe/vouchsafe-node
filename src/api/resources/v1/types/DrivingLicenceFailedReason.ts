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
import {
  FailedReasonDocumentFeatureMissing,
  failedReasonDocumentFeatureMissing,
} from './FailedReasonDocumentFeatureMissing';
import {
  FailedReasonInvalidIdFormat,
  failedReasonInvalidIdFormat,
} from './FailedReasonInvalidIdFormat';
import {
  FailedReasonContainsUnwantedPhrases,
  failedReasonContainsUnwantedPhrases,
} from './FailedReasonContainsUnwantedPhrases';
import {
  FailedReasonInvalidIssuingAuthority,
  failedReasonInvalidIssuingAuthority,
} from './FailedReasonInvalidIssuingAuthority';

/**
 * Cast schema for the DrivingLicenceFailedReason model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const drivingLicenceFailedReason = core.cast.identity<DrivingLicenceFailedReason>();

export type DrivingLicenceFailedReason =
  | FailedReasonPartialExtraction
  | FailedReasonExpiryDatePassed
  | FailedReasonDocumentPastExpiryWindow
  | FailedReasonInvalidDocumentDateFormat
  | FailedReasonDocumentFeatureMissing
  | FailedReasonInvalidIdFormat
  | FailedReasonContainsUnwantedPhrases
  | FailedReasonInvalidIssuingAuthority;

export const drivingLicenceFailedReasonResponse = core.cast.identity<DrivingLicenceFailedReason>();

export const drivingLicenceFailedReasonRequest = core.cast.identity<DrivingLicenceFailedReason>();
