import * as core from '../../../../core';
import {
  EvisaConditionsSuccessApi,
  evisaConditionsSuccessApi,
  evisaConditionsSuccessApiRequest,
  evisaConditionsSuccessApiResponse,
} from './EvisaConditionsSuccessApi';
import {
  EvisaConditionsFailedApi,
  evisaConditionsFailedApi,
  evisaConditionsFailedApiRequest,
  evisaConditionsFailedApiResponse,
} from './EvisaConditionsFailedApi';

/**
 * Cast schema for the EvisaConditionsApi model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const evisaConditionsApi = core.cast.identity<EvisaConditionsApi>();

export type EvisaConditionsApi = EvisaConditionsSuccessApi | EvisaConditionsFailedApi;

export const evisaConditionsApiResponse1 = core.cast.identity<EvisaConditionsApi>();

export const evisaConditionsApiRequest = core.cast.identity<EvisaConditionsApi>();
