import * as core from '../../../../core';
import {
  EvisaConditionsSuccess,
  evisaConditionsSuccess,
  evisaConditionsSuccessRequest,
  evisaConditionsSuccessResponse,
} from './EvisaConditionsSuccess';
import {
  EvisaConditionsFailed,
  evisaConditionsFailed,
  evisaConditionsFailedRequest,
  evisaConditionsFailedResponse,
} from './EvisaConditionsFailed';

/**
 * Cast schema for the EvisaConditionsApiResponse model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const evisaConditionsApiResponse = core.cast.identity<EvisaConditionsApiResponse>();

export type EvisaConditionsApiResponse = EvisaConditionsSuccess | EvisaConditionsFailed;

export const evisaConditionsApiResponseResponse = core.cast.identity<EvisaConditionsApiResponse>();

export const evisaConditionsApiResponseRequest = core.cast.identity<EvisaConditionsApiResponse>();
