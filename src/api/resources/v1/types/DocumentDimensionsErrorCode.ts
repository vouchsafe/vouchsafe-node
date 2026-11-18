import * as core from '../../../../core';
import {
  FailedReasonLowDocTypeMatch,
  failedReasonLowDocTypeMatch,
} from './FailedReasonLowDocTypeMatch';
import {
  FailedReasonMediumDocTypeMatch,
  failedReasonMediumDocTypeMatch,
} from './FailedReasonMediumDocTypeMatch';

/**
 * Cast schema for the DocumentDimensionsErrorCode model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const documentDimensionsErrorCode = core.cast.identity<DocumentDimensionsErrorCode>();

export type DocumentDimensionsErrorCode =
  | FailedReasonLowDocTypeMatch
  | FailedReasonMediumDocTypeMatch;

export const documentDimensionsErrorCodeResponse =
  core.cast.identity<DocumentDimensionsErrorCode>();

export const documentDimensionsErrorCodeRequest = core.cast.identity<DocumentDimensionsErrorCode>();
