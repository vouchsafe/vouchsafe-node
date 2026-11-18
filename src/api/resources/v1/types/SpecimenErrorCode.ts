import * as core from '../../../../core';
import {
  FailedReasonWatermarkTextDetected,
  failedReasonWatermarkTextDetected,
} from './FailedReasonWatermarkTextDetected';
import {
  FailedReasonSampleDocumentNumberDetected,
  failedReasonSampleDocumentNumberDetected,
} from './FailedReasonSampleDocumentNumberDetected';
import {
  FailedReasonSampleNameDetected,
  failedReasonSampleNameDetected,
} from './FailedReasonSampleNameDetected';
import {
  FailedReasonSampleMrzCodeDetected,
  failedReasonSampleMrzCodeDetected,
} from './FailedReasonSampleMrzCodeDetected';

/**
 * Cast schema for the SpecimenErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const specimenErrorCode = core.cast.identity<SpecimenErrorCode>();

export type SpecimenErrorCode =
  | FailedReasonWatermarkTextDetected
  | FailedReasonSampleDocumentNumberDetected
  | FailedReasonSampleNameDetected
  | FailedReasonSampleMrzCodeDetected;

export const specimenErrorCodeResponse = core.cast.identity<SpecimenErrorCode>();

export const specimenErrorCodeRequest = core.cast.identity<SpecimenErrorCode>();
