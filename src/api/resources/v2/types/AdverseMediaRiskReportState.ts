import * as core from '../../../../core';
import { AdverseMediaOutcome, adverseMediaOutcome } from './AdverseMediaOutcome';
import {
  AdverseMediaRiskReportState2,
  adverseMediaRiskReportState2,
} from './AdverseMediaRiskReportState2';

/**
 * Cast schema for the AdverseMediaRiskReportState model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const adverseMediaRiskReportState = core.cast.identity<AdverseMediaRiskReportState>();

/**
 * The screening outcome, or `NOT_PERFORMED` when the search couldn't run
 */
export type AdverseMediaRiskReportState = AdverseMediaOutcome | AdverseMediaRiskReportState2;

export const adverseMediaRiskReportStateResponse =
  core.cast.identity<AdverseMediaRiskReportState>();

export const adverseMediaRiskReportStateRequest = core.cast.identity<AdverseMediaRiskReportState>();
