import * as core from '../../../../core';
import {
  ImmigrationStatusInput as _ImmigrationStatusInput,
  immigrationStatusInput,
  immigrationStatusInputRequest,
  immigrationStatusInputResponse,
} from './ImmigrationStatusInput';
import {
  RightToWorkInput as _RightToWorkInput,
  rightToWorkInput,
  rightToWorkInputRequest,
  rightToWorkInputResponse,
} from './RightToWorkInput';
import {
  RightToRentInput as _RightToRentInput,
  rightToRentInput,
  rightToRentInputRequest,
  rightToRentInputResponse,
} from './RightToRentInput';

/**
 * Cast schema for the EvisaVerificationInput model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const evisaVerificationInput = core.cast.identity<EvisaVerificationInput>();

/**
 * Union type for all eVisa verification inputs
 */
export type EvisaVerificationInput =
  | EvisaVerificationInput.ImmigrationStatus
  | EvisaVerificationInput.RightToWork
  | EvisaVerificationInput.RightToRent;

export namespace EvisaVerificationInput {
  export interface ImmigrationStatus extends _ImmigrationStatusInput {
    sub_type: 'ImmigrationStatus';
  }
  export interface RightToWork extends _RightToWorkInput {
    sub_type: 'RightToWork';
  }
  export interface RightToRent extends _RightToRentInput {
    sub_type: 'RightToRent';
  }
}

export const evisaVerificationInputResponse = core.cast.identity<EvisaVerificationInput>();

export const evisaVerificationInputRequest = core.cast.identity<EvisaVerificationInput>();
