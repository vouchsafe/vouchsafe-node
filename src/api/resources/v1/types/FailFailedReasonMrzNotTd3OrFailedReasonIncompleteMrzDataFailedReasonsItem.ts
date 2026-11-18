import * as core from '../../../../core';
import { FailedReasonMrzNotTd3, failedReasonMrzNotTd3 } from './FailedReasonMrzNotTd3';
import {
  FailedReasonIncompleteMrzData,
  failedReasonIncompleteMrzData,
} from './FailedReasonIncompleteMrzData';

/**
 * Cast schema for the FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem =
  core.cast.identity<FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem>();

export type FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem =
  | FailedReasonMrzNotTd3
  | FailedReasonIncompleteMrzData;

export const failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItemResponse =
  core.cast.identity<FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem>();

export const failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItemRequest =
  core.cast.identity<FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem>();
