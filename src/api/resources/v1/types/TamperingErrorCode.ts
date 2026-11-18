import * as core from '../../../../core';
import {
  FailedReasonDocumentLooksLikeScreenshot,
  failedReasonDocumentLooksLikeScreenshot,
} from './FailedReasonDocumentLooksLikeScreenshot';
import {
  FailedReasonDocumentTextTampered,
  failedReasonDocumentTextTampered,
} from './FailedReasonDocumentTextTampered';
import {
  FailedReasonDocumentColorProfileChanged,
  failedReasonDocumentColorProfileChanged,
} from './FailedReasonDocumentColorProfileChanged';
import {
  FailedReasonDocumentTamperedInconclusive,
  failedReasonDocumentTamperedInconclusive,
} from './FailedReasonDocumentTamperedInconclusive';
import {
  FailedReasonDocumentCornersNotDetected,
  failedReasonDocumentCornersNotDetected,
} from './FailedReasonDocumentCornersNotDetected';
import {
  FailedReasonPartialExtraction,
  failedReasonPartialExtraction,
} from './FailedReasonPartialExtraction';
import {
  FailedReasonDocumentLooksLikePrintCopy,
  failedReasonDocumentLooksLikePrintCopy,
} from './FailedReasonDocumentLooksLikePrintCopy';
import {
  FailedReasonDocumentIsGrayscale,
  failedReasonDocumentIsGrayscale,
} from './FailedReasonDocumentIsGrayscale';
import {
  FailedReasonPossiblyTampered,
  failedReasonPossiblyTampered,
} from './FailedReasonPossiblyTampered';

/**
 * Cast schema for the TamperingErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const tamperingErrorCode = core.cast.identity<TamperingErrorCode>();

export type TamperingErrorCode =
  | FailedReasonDocumentLooksLikeScreenshot
  | FailedReasonDocumentTextTampered
  | FailedReasonDocumentColorProfileChanged
  | FailedReasonDocumentTamperedInconclusive
  | FailedReasonDocumentCornersNotDetected
  | FailedReasonPartialExtraction
  | FailedReasonDocumentLooksLikePrintCopy
  | FailedReasonDocumentIsGrayscale
  | FailedReasonPossiblyTampered;

export const tamperingErrorCodeResponse = core.cast.identity<TamperingErrorCode>();

export const tamperingErrorCodeRequest = core.cast.identity<TamperingErrorCode>();
