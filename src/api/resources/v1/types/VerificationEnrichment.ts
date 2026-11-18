import * as core from '../../../../core';
import { AmlCheckApi, amlCheckApi, amlCheckApiRequest, amlCheckApiResponse } from './AmlCheckApi';
import { OfaCheckApi, ofaCheckApi, ofaCheckApiRequest, ofaCheckApiResponse } from './OfaCheckApi';
import {
  RadarCheckApi,
  radarCheckApi,
  radarCheckApiRequest,
  radarCheckApiResponse,
} from './RadarCheckApi';

/**
 * Cast schema for the VerificationEnrichment model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const verificationEnrichment = core.cast.identity<VerificationEnrichment>();

export type VerificationEnrichment = AmlCheckApi | OfaCheckApi | RadarCheckApi;

export const verificationEnrichmentResponse = core.cast.identity<VerificationEnrichment>();

export const verificationEnrichmentRequest = core.cast.identity<VerificationEnrichment>();
