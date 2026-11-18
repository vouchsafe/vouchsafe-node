import * as core from '../../../../core';
import {
  ImmigrationStatusDetailsApi,
  immigrationStatusDetailsApi,
  immigrationStatusDetailsApiRequest,
  immigrationStatusDetailsApiResponse,
} from './ImmigrationStatusDetailsApi';
import {
  RightToWorkDetailsApi,
  rightToWorkDetailsApi,
  rightToWorkDetailsApiRequest,
  rightToWorkDetailsApiResponse,
} from './RightToWorkDetailsApi';
import {
  RightToRentDetailsApi,
  rightToRentDetailsApi,
  rightToRentDetailsApiRequest,
  rightToRentDetailsApiResponse,
} from './RightToRentDetailsApi';

/**
 * Cast schema for the EvisaExtractedDetailsApi model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const evisaExtractedDetailsApi = core.cast.identity<EvisaExtractedDetailsApi>();

export type EvisaExtractedDetailsApi =
  | ImmigrationStatusDetailsApi
  | RightToWorkDetailsApi
  | RightToRentDetailsApi;

export const evisaExtractedDetailsApiResponse = core.cast.identity<EvisaExtractedDetailsApi>();

export const evisaExtractedDetailsApiRequest = core.cast.identity<EvisaExtractedDetailsApi>();
