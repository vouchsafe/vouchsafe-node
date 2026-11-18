import * as core from '../../../../core';
import { RiskEnrichment, riskEnrichment } from './RiskEnrichment';
import {
  PublicAddress,
  publicAddress,
  publicAddressRequest,
  publicAddressResponse,
} from './PublicAddress';
import { Risk2Recommendation, risk2Recommendation } from './Risk2Recommendation';
import {
  Risk2EnrichmentReports,
  risk2EnrichmentReports,
  risk2EnrichmentReportsRequest,
  risk2EnrichmentReportsResponse,
} from './Risk2EnrichmentReports';
import {
  Risk2Metadata,
  risk2Metadata,
  risk2MetadataRequest,
  risk2MetadataResponse,
} from './Risk2Metadata';

export interface GetRisk2Response {
  /** Unique identifier for this risk assessment. */
  id: string;
  /** The `acc_` ID of the account the check ran on, or `null` for checks made without one. */
  account: string | null;
  /** The team that performed this assessment. */
  team_id: string;
  /** The optional enrichment checks that were requested alongside Radar. */
  enrichments: RiskEnrichment[];
  first_name: string;
  last_name: string;
  address: PublicAddress | null;
  /** Date of birth in YYYY-MM-DD format. */
  date_of_birth: string;
  /** Email address used as the primary Radar matching key. */
  email: string;
  phone?: string;
  /** Risk score from 0 (highest risk) to 100 (lowest risk).
Derived from the weighted sum of trust and fraud signals detected. */
  risk_score: number;
  recommendation: Risk2Recommendation;
  /** Signals that contributed positively to the risk score. */
  trust_signals: string[];
  /** Signals that contributed negatively to the risk score. */
  fraud_signals: string[];
  enrichment_reports?: Risk2EnrichmentReports;
  metadata: Risk2Metadata;
  /** Whether the check consumed billable credits. */
  billable: boolean;
  /** When ongoing AML monitoring was enabled (ISO 8601), or `null` if not active. See [Alerts API](https://docs.vouchsafe.id/api/v1/toggle-alerts). */
  alerts_enabled_at: string | null;
  /** ISO 8601 timestamp of when this risk assessment was created. */
  created_at: string;
}

/**
 * Cast schema for the GetRisk2Response model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const getRisk2Response = core.cast.identity<GetRisk2Response>();

/**
 * Cast schema for mapping API responses to the GetRisk2Response application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const getRisk2ResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'account',
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
      account: raw['account'],
      team_id: raw['team_id'],
      enrichments: raw['enrichments'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      address:
        raw['address'] == null ? raw['address'] : publicAddressResponse.parse(raw['address']),
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
          : risk2EnrichmentReportsResponse.parse(raw['enrichment_reports']),
      metadata:
        raw['metadata'] == null ? raw['metadata'] : risk2MetadataResponse.parse(raw['metadata']),
      billable: raw['billable'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      created_at: raw['created_at'],
    };
  },
  [
    'id',
    'account',
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
    'metadata',
    'billable',
    'alerts_enabled_at',
    'created_at',
  ],
);

/**
 * Cast schema for mapping the GetRisk2Response application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const getRisk2ResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      account: raw['account'],
      team_id: raw['team_id'],
      enrichments: raw['enrichments'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      address: raw['address'] == null ? raw['address'] : publicAddressRequest.parse(raw['address']),
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
          : risk2EnrichmentReportsRequest.parse(raw['enrichment_reports']),
      metadata:
        raw['metadata'] == null ? raw['metadata'] : risk2MetadataRequest.parse(raw['metadata']),
      billable: raw['billable'],
      alerts_enabled_at: raw['alerts_enabled_at'],
      created_at: raw['created_at'],
    };
  },
  [
    'id',
    'account',
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
    'metadata',
    'billable',
    'alerts_enabled_at',
    'created_at',
  ],
);
