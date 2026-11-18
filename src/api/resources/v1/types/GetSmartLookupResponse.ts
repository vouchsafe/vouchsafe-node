import * as core from '../../../../core';
import {
  GetSmartLookupResponseChecksItem,
  getSmartLookupResponseChecksItem,
} from './GetSmartLookupResponseChecksItem';
import {
  PublicAddress,
  publicAddress,
  publicAddressRequest,
  publicAddressResponse,
} from './PublicAddress';
import {
  CreditBureauVerificationReport,
  creditBureauVerificationReport,
  creditBureauVerificationReportRequest,
  creditBureauVerificationReportResponse,
} from './CreditBureauVerificationReport';
import {
  OnlineFootprintVerificationReport,
  onlineFootprintVerificationReport,
  onlineFootprintVerificationReportRequest,
  onlineFootprintVerificationReportResponse,
} from './OnlineFootprintVerificationReport';
import {
  AmlVerificationReport,
  amlVerificationReport,
  amlVerificationReportRequest,
  amlVerificationReportResponse,
} from './AmlVerificationReport';
import {
  SmartLookupMetadataApi,
  smartLookupMetadataApi,
  smartLookupMetadataApiRequest,
  smartLookupMetadataApiResponse,
} from './SmartLookupMetadataApi';
import { GetSmartLookupResponseChecks } from '../../../types/GetSmartLookupResponseChecks';

export interface GetSmartLookupResponse {
  id: string;
  team_id: string;
  checks: GetSmartLookupResponseChecksItem[];
  first_name: string | null;
  last_name: string | null;
  /** To be deprecated. Use `address` instead. */
  first_line_of_address: string | null;
  /** To be deprecated. Use `address` instead. */
  postcode: string | null;
  address: PublicAddress | null;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  credit_bureau_verification_report?: CreditBureauVerificationReport;
  online_footprint_verification_report?: OnlineFootprintVerificationReport;
  aml_verification_report?: AmlVerificationReport;
  /** Whether tokens were charged for this lookup. `false` when the result was served from the four-hour cache. */
  billable: boolean;
  metadata: SmartLookupMetadataApi;
  /** When ongoing AML monitoring was turned on for this person (ISO 8601), or `null` if monitoring isn't active. See the [Alerts API](https://docs.vouchsafe.id/api/v1/toggle-alerts). */
  alerts_enabled_at: string | null;
  /** When the lookup was run (ISO 8601). */
  created_at: string;
}

export namespace GetSmartLookupResponse {
  export type Checks = GetSmartLookupResponseChecks;
  export namespace Checks {
    export type Item = GetSmartLookupResponseChecksItem;
    export const Item = GetSmartLookupResponseChecksItem;
  }
}

/**
 * Cast schema for the GetSmartLookupResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const getSmartLookupResponse = core.cast.identity<GetSmartLookupResponse>();

/**
 * Cast schema for mapping API responses to the GetSmartLookupResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const getSmartLookupResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'team_id',
      'checks',
      'first_name',
      'last_name',
      'first_line_of_address',
      'postcode',
      'address',
      'date_of_birth',
      'email',
      'phone',
      'credit_bureau_verification_report',
      'online_footprint_verification_report',
      'aml_verification_report',
      'billable',
      'metadata',
      'alerts_enabled_at',
      'created_at',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      id: raw['id'],
      team_id: raw['team_id'],
      checks: raw['checks'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      address:
        raw['address'] == null ? raw['address'] : publicAddressResponse.parse(raw['address']),
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
      phone: raw['phone'],
      credit_bureau_verification_report:
        raw['credit_bureau_verification_report'] == null
          ? raw['credit_bureau_verification_report']
          : creditBureauVerificationReportResponse.parse(raw['credit_bureau_verification_report']),
      online_footprint_verification_report:
        raw['online_footprint_verification_report'] == null
          ? raw['online_footprint_verification_report']
          : onlineFootprintVerificationReportResponse.parse(
              raw['online_footprint_verification_report'],
            ),
      aml_verification_report:
        raw['aml_verification_report'] == null
          ? raw['aml_verification_report']
          : amlVerificationReportResponse.parse(raw['aml_verification_report']),
      billable: raw['billable'],
      metadata:
        raw['metadata'] == null
          ? raw['metadata']
          : smartLookupMetadataApiResponse.parse(raw['metadata']),
      alerts_enabled_at: raw['alerts_enabled_at'],
      created_at: raw['created_at'],
    };
  },
  [
    'id',
    'team_id',
    'checks',
    'first_name',
    'last_name',
    'first_line_of_address',
    'postcode',
    'address',
    'billable',
    'metadata',
    'alerts_enabled_at',
    'created_at',
  ],
);

/**
 * Cast schema for mapping the GetSmartLookupResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const getSmartLookupResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      team_id: raw['team_id'],
      checks: raw['checks'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      address: raw['address'] == null ? raw['address'] : publicAddressRequest.parse(raw['address']),
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
      phone: raw['phone'],
      credit_bureau_verification_report:
        raw['credit_bureau_verification_report'] == null
          ? raw['credit_bureau_verification_report']
          : creditBureauVerificationReportRequest.parse(raw['credit_bureau_verification_report']),
      online_footprint_verification_report:
        raw['online_footprint_verification_report'] == null
          ? raw['online_footprint_verification_report']
          : onlineFootprintVerificationReportRequest.parse(
              raw['online_footprint_verification_report'],
            ),
      aml_verification_report:
        raw['aml_verification_report'] == null
          ? raw['aml_verification_report']
          : amlVerificationReportRequest.parse(raw['aml_verification_report']),
      billable: raw['billable'],
      metadata:
        raw['metadata'] == null
          ? raw['metadata']
          : smartLookupMetadataApiRequest.parse(raw['metadata']),
      alerts_enabled_at: raw['alerts_enabled_at'],
      created_at: raw['created_at'],
    };
  },
  [
    'id',
    'team_id',
    'checks',
    'first_name',
    'last_name',
    'first_line_of_address',
    'postcode',
    'address',
    'billable',
    'metadata',
    'alerts_enabled_at',
    'created_at',
  ],
);
