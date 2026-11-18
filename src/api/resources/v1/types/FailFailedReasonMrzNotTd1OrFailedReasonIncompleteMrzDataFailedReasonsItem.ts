import * as core from '../../../../core';
import { FailedReasonMrzNotTd1, failedReasonMrzNotTd1 } from './FailedReasonMrzNotTd1';
import {
  FailedReasonIncompleteMrzData,
  failedReasonIncompleteMrzData,
} from './FailedReasonIncompleteMrzData';

/**
 * Cast schema for the FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem =
  core.cast.identity<FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem>();

export type FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem =
  | FailedReasonMrzNotTd1
  | FailedReasonIncompleteMrzData;

export const failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItemResponse =
  core.cast.identity<FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem>();

export const failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItemRequest =
  core.cast.identity<FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem>();
