import * as core from '../../../../core';
import { CertifiedCheckType, certifiedCheckType } from './CertifiedCheckType';
import { ProfileState, profileState } from './ProfileState';

/**
 * UK DVS trust framework certified check details. Only present for certified (Right to Work, Right to Rent, DBS) verifications.
 */
export interface CertifiedDetails {
  check_type: CertifiedCheckType;
  /** Whether the configured identity profile has been met: "met", "pending", "not_met", or "review" (trial account, for evaluation purposes only). */
  identity_profile_state: ProfileState;
  /** Whether the check was conducted in accordance with the relevant Supplementary Code. */
  supplementary_code_compliant: boolean;
  /** The version of the UK DVS trust framework Vouchsafe was certified against at the time of the check. */
  trust_framework_version: string;
  /** Whether the identity verification step has been completed. */
  identity_verified: boolean;
  /** When the identity check was carried out. Only present when identity_verified is true. */
  date_of_identity_check?: string;
  /** Whether the address was verified. Only present for DBS verifications. */
  address_verified?: boolean;
  /** When the address check used for this compliance assessment was carried out. Only present when address_verified is true. */
  date_of_address_check?: string;
  /** The entity that checked the evidence. */
  evidence_checked_by: string;
  /** Whether Vouchsafe was registered to the UK digital identity services register at the time of the check. */
  registration_confirmed: boolean;
  /** Vouchsafe's entry on the UK digital identity services register. */
  registration_entry: string;
}

/**
 * Cast schema for the CertifiedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const certifiedDetails = core.cast.identity<CertifiedDetails>();

/**
 * Cast schema for mapping API responses to the CertifiedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const certifiedDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'check_type',
      'identity_profile_state',
      'supplementary_code_compliant',
      'trust_framework_version',
      'identity_verified',
      'date_of_identity_check',
      'address_verified',
      'date_of_address_check',
      'evidence_checked_by',
      'registration_confirmed',
      'registration_entry',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      check_type: raw['check_type'],
      identity_profile_state: raw['identity_profile_state'],
      supplementary_code_compliant: raw['supplementary_code_compliant'],
      trust_framework_version: raw['trust_framework_version'],
      identity_verified: raw['identity_verified'],
      date_of_identity_check: raw['date_of_identity_check'],
      address_verified: raw['address_verified'],
      date_of_address_check: raw['date_of_address_check'],
      evidence_checked_by: raw['evidence_checked_by'],
      registration_confirmed: raw['registration_confirmed'],
      registration_entry: raw['registration_entry'],
    };
  },
  [
    'check_type',
    'identity_profile_state',
    'supplementary_code_compliant',
    'trust_framework_version',
    'identity_verified',
    'evidence_checked_by',
    'registration_confirmed',
    'registration_entry',
  ],
);

/**
 * Cast schema for mapping the CertifiedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const certifiedDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      check_type: raw['check_type'],
      identity_profile_state: raw['identity_profile_state'],
      supplementary_code_compliant: raw['supplementary_code_compliant'],
      trust_framework_version: raw['trust_framework_version'],
      identity_verified: raw['identity_verified'],
      date_of_identity_check: raw['date_of_identity_check'],
      address_verified: raw['address_verified'],
      date_of_address_check: raw['date_of_address_check'],
      evidence_checked_by: raw['evidence_checked_by'],
      registration_confirmed: raw['registration_confirmed'],
      registration_entry: raw['registration_entry'],
    };
  },
  [
    'check_type',
    'identity_profile_state',
    'supplementary_code_compliant',
    'trust_framework_version',
    'identity_verified',
    'evidence_checked_by',
    'registration_confirmed',
    'registration_entry',
  ],
);
