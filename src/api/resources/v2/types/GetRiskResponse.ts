import * as core from '../../../../core';
import {
  GetRiskResponseEnrichmentsItem,
  getRiskResponseEnrichmentsItem,
} from './GetRiskResponseEnrichmentsItem';
import {
  PublicAddressV2,
  publicAddressV2,
  publicAddressV2Request,
  publicAddressV2Response,
} from './PublicAddressV2';
import { Recommendation, recommendation } from './Recommendation';
import {
  EnrichmentReports,
  enrichmentReports,
  enrichmentReportsRequest,
  enrichmentReportsResponse,
} from './EnrichmentReports';
import {
  RiskMetadata,
  riskMetadata,
  riskMetadataRequest,
  riskMetadataResponse,
} from './RiskMetadata';
import { GetRiskResponseEnrichments } from '../../../types/GetRiskResponseEnrichments';

export interface GetRiskResponse {
  /** Unique identifier for this risk assessment. */
  id: string;
  /** The team that performed this assessment. */
  team_id: string;
  /** The optional enrichment checks that were requested alongside Radar, as sent. `"CREDIT_BUREAU"` is deprecated. */
  enrichments: GetRiskResponseEnrichmentsItem[];
  first_name: string;
  last_name: string;
  address: PublicAddressV2 | null;
  /** Date of birth in YYYY-MM-DD format. */
  date_of_birth: string;
  /** Email address used as the primary Radar matching key. */
  email: string;
  phone?: string;
  /** Risk score from 0 (highest risk) to 100 (lowest risk).
Derived from the weighted sum of trust and fraud signals detected. */
  risk_score: number;
  recommendation: Recommendation;
  /** Signals that contributed positively to the risk score. */
  trust_signals: string[];
  /** Signals that contributed negatively to the risk score. */
  fraud_signals: string[];
  enrichment_reports?: EnrichmentReports;
  metadata?: RiskMetadata;
  /** Whether the check consumed billable credits. */
  billable: boolean;
  /** When ongoing AML monitoring was enabled (ISO 8601), or `null` if not active. See [Alerts API](https://docs.vouchsafe.id/api/v1/toggle-alerts). */
  alerts_enabled_at: string | null;
  /** ISO 8601 timestamp of when this risk assessment was created. */
  created_at: string;
}

export namespace GetRiskResponse {
  export type Enrichments = GetRiskResponseEnrichments;
  export namespace Enrichments {
    export type Item = GetRiskResponseEnrichmentsItem;
    export const Item = GetRiskResponseEnrichmentsItem;
  }
}

/**
 * Cast schema for the GetRiskResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const getRiskResponse = core.cast.identity<GetRiskResponse>();

/**
 * Cast schema for mapping API responses to the GetRiskResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const getRiskResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'team_id',
      'enrichments',
      'first_name',
      'last_name',
      'address',
      'date_of_birth',
      'email',
      'phone',
      'risk_score',
      'recommendation',
      'trust_signals',
      'fraud_signals',
      'enrichment_reports',
      'metadata',
      'billable',
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
      enrichments: raw['enrichments'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      address:
        raw['address'] == null ? raw['address'] : publicAddressV2Response.parse(raw['address']),
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
      phone: raw['phone'],
      risk_score: raw['risk_score'],
      recommendation: raw['recommendation'],
      trust_signals: raw['trust_signals'],
      fraud_signals: raw['fraud_signals'],
      enrichment_reports:
        raw['enrichment_reports'] == null
          ? raw['enrichment_reports']
          : enrichmentReportsResponse.parse(raw['enrichment_reports']),
      metadata:
        raw['metadata'] == null ? raw['metadata'] : riskMetadataResponse.parse(raw['metadata']),
      billable: raw['billable'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      created_at: raw['created_at'],
    };
  },
  [
    'id',
    'team_id',
    'enrichments',
    'first_name',
    'last_name',
    'address',
    'date_of_birth',
    'email',
    'risk_score',
    'recommendation',
    'trust_signals',
    'fraud_signals',
    'billable',
    'alerts_enabled_at',
    'created_at',
  ],
);

/**
 * Cast schema for mapping the GetRiskResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const getRiskResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      team_id: raw['team_id'],
      enrichments: raw['enrichments'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      address:
        raw['address'] == null ? raw['address'] : publicAddressV2Request.parse(raw['address']),
      date_of_birth: raw['date_of_birth'],
      email: raw['email'],
      phone: raw['phone'],
      risk_score: raw['risk_score'],
      recommendation: raw['recommendation'],
      trust_signals: raw['trust_signals'],
      fraud_signals: raw['fraud_signals'],
      enrichment_reports:
        raw['enrichment_reports'] == null
          ? raw['enrichment_reports']
          : enrichmentReportsRequest.parse(raw['enrichment_reports']),
      metadata:
        raw['metadata'] == null ? raw['metadata'] : riskMetadataRequest.parse(raw['metadata']),
      billable: raw['billable'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      created_at: raw['created_at'],
    };
  },
  [
    'id',
    'team_id',
    'enrichments',
    'first_name',
    'last_name',
    'address',
    'date_of_birth',
    'email',
    'risk_score',
    'recommendation',
    'trust_signals',
    'fraud_signals',
    'billable',
    'alerts_enabled_at',
    'created_at',
  ],
);
