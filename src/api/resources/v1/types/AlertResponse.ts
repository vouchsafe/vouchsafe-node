import * as core from '../../../../core';
import {
  AmlAlertResponse as _AmlAlertResponse,
  amlAlertResponse,
  amlAlertResponseRequest,
  amlAlertResponseResponse,
} from './AmlAlertResponse';
import {
  FraudBlocklistAlertResponse as _FraudBlocklistAlertResponse,
  fraudBlocklistAlertResponse,
  fraudBlocklistAlertResponseRequest,
  fraudBlocklistAlertResponseResponse,
} from './FraudBlocklistAlertResponse';

/**
 * Cast schema for the AlertResponse model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const alertResponse = core.cast.identity<AlertResponse>();

export type AlertResponse = AlertResponse.Aml | AlertResponse.FraudBlocklist;

export namespace AlertResponse {
  export interface Aml extends _AmlAlertResponse {
    source: 'AML';
  }
  export interface FraudBlocklist extends _FraudBlocklistAlertResponse {
    source: 'FraudBlocklist';
  }
}

export const alertResponseResponse = core.cast.identity<AlertResponse>();

export const alertResponseRequest = core.cast.identity<AlertResponse>();
