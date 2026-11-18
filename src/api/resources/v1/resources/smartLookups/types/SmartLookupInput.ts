import * as core from '../../../../../../core';
import {
  SmartLookupInputChecksItem,
  smartLookupInputChecksItem,
} from './SmartLookupInputChecksItem';
import {
  AddressInput,
  addressInput,
  addressInputRequest,
  addressInputResponse,
} from '../../../types/AddressInput';
import {
  SmartLookupInputThresholds,
  smartLookupInputThresholds,
  smartLookupInputThresholdsRequest,
  smartLookupInputThresholdsResponse,
} from './SmartLookupInputThresholds';
import { SmartLookupInputChecks } from '../../../../../types/SmartLookupInputChecks';

export interface SmartLookupInput {
  /** (required) — Given name(s) */
  first_name: string;
  /** (required) — Family name */
  last_name: string;
  /** (required) */
  checks: SmartLookupInputChecksItem[];
  address?: AddressInput;
  /** To be deprecated. Use `address` instead. */
  first_line_of_address?: string;
  /** To be deprecated. Use `address` instead. */
  postcode?: string;
  /** (conditionally required) — Email address. Either email or phone is required when checks includes OnlineFootprint; otherwise optional. */
  email?: string;
  /** (conditionally required) — Phone number in E.164 format. Either email or phone is required when checks includes OnlineFootprint; otherwise optional.
For CreditBureau checks, providing a UK phone number can improve match rates by enabling matching against mobile data. */
  phone?: string;
  /** (conditionally required) — Required when checks includes CreditBureau or AML; otherwise optional. Format as YYYY-MM-DD or ISO 8601 */
  date_of_birth?: string;
  /** (conditionally required) — Used to set a threshold for OnlineFootprint and AML checks, otherwise defaulting to 50 and 96 for OnlineFootprint and AML respectively */
  thresholds?: SmartLookupInputThresholds;
  /** (optional) When true, enables ongoing AML monitoring for this lookup.
Requires the Alerts feature entitlement. */
  alerts_enabled?: boolean;
}

export namespace SmartLookupInput {
  export type Checks = SmartLookupInputChecks;
  export namespace Checks {
    export type Item = SmartLookupInputChecksItem;
    export const Item = SmartLookupInputChecksItem;
  }
  export interface Thresholds {
    aml?: SmartLookupInputThresholds['aml'];
    onlineFootprint?: SmartLookupInputThresholds['onlineFootprint'];
  }
}

/**
 * Cast schema for the SmartLookupInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const smartLookupInput = core.cast.identity<SmartLookupInput>();

/**
 * Cast schema for mapping API responses to the SmartLookupInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const smartLookupInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'checks',
      'address',
      'first_line_of_address',
      'postcode',
      'email',
      'phone',
      'date_of_birth',
      'thresholds',
      'alerts_enabled',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      checks: raw['checks'],
      address: raw['address'] == null ? raw['address'] : addressInputResponse.parse(raw['address']),
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      email: raw['email'],
      phone: raw['phone'],
      date_of_birth: raw['date_of_birth'],
      thresholds:
        raw['thresholds'] == null
          ? raw['thresholds']
          : smartLookupInputThresholdsResponse.parse(raw['thresholds']),
      alerts_enabled: raw['alerts_enabled'],
    };
  },
  ['first_name', 'last_name', 'checks'],
);

/**
 * Cast schema for mapping the SmartLookupInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const smartLookupInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      checks: raw['checks'],
      address: raw['address'] == null ? raw['address'] : addressInputRequest.parse(raw['address']),
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      email: raw['email'],
      phone: raw['phone'],
      date_of_birth: raw['date_of_birth'],
      thresholds:
        raw['thresholds'] == null
          ? raw['thresholds']
          : smartLookupInputThresholdsRequest.parse(raw['thresholds']),
      alerts_enabled: raw['alerts_enabled'],
    };
  },
  ['first_name', 'last_name', 'checks'],
);
