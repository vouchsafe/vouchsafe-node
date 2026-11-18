import * as core from '../../../../core';
import {
  ImmigrationStatusVerificationResponse as _ImmigrationStatusVerificationResponse,
  immigrationStatusVerificationResponse,
  immigrationStatusVerificationResponseRequest,
  immigrationStatusVerificationResponseResponse,
} from './ImmigrationStatusVerificationResponse';
import {
  RightToWorkVerificationResponse as _RightToWorkVerificationResponse,
  rightToWorkVerificationResponse,
  rightToWorkVerificationResponseRequest,
  rightToWorkVerificationResponseResponse,
} from './RightToWorkVerificationResponse';
import {
  RightToRentVerificationResponse as _RightToRentVerificationResponse,
  rightToRentVerificationResponse,
  rightToRentVerificationResponseRequest,
  rightToRentVerificationResponseResponse,
} from './RightToRentVerificationResponse';

/**
 * Cast schema for the EvisaVerificationResponse model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const evisaVerificationResponse = core.cast.identity<EvisaVerificationResponse>();

export type EvisaVerificationResponse =
  | EvisaVerificationResponse.ImmigrationStatus
  | EvisaVerificationResponse.RightToWork
  | EvisaVerificationResponse.RightToRent;

export namespace EvisaVerificationResponse {
  export interface ImmigrationStatus extends _ImmigrationStatusVerificationResponse {
    evidence_type: 'immigration_status';
  }
  export interface RightToWork extends _RightToWorkVerificationResponse {
    evidence_type: 'right_to_work';
  }
  export interface RightToRent extends _RightToRentVerificationResponse {
    evidence_type: 'right_to_rent';
  }
}

export const evisaVerificationResponseResponse = core.cast.identity<EvisaVerificationResponse>();

export const evisaVerificationResponseRequest = core.cast.identity<EvisaVerificationResponse>();
