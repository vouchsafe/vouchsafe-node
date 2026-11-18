import * as core from '../../../../core';
import { CaseStatus, caseStatus } from './CaseStatus';
import { IdentityProfile, identityProfile } from './IdentityProfile';

export interface Verification {
  /** Unique ID for tracking a verification session over time. */
  id: string;
  status: CaseStatus;
  /** When it was originally requested or begun. */
  created_at: string;
  /** When the personal data for this verification was erased to fulfil an erasure request, or `null`
if it has not been erased. The status and timestamps are retained, but personal data fields
(`claim_details`, check `extracted_details`, artefacts and enrichments) will be empty once erased. */
  erased_at?: string | null;
  /** Email of the operator who erased the personal data, or `null` if it has not been erased. */
  erased_by?: string | null;
  /** When the user will stop getting reminders. */
  expires_at: string;
  /** The originally supplied email address. */
  email: string | null;
  /** Where to send the user once verified. If null, the verification flow default will be used. */
  redirect_url: string | null;
  /** Where to send the user once they've submitted but aren't verified yet. If null, the verification flow default will be used. */
  pending_redirect_url: string | null;
  /** Where to send the user if they're refused or blocked. If null, the verification flow default will be used. */
  failure_redirect_url: string | null;
  /** The verification flow it belongs to. */
  flow_id?: string | null;
  /** To be deprecated - Use flow_id instead. */
  workflow_id?: string | null;
  /** An identifier from your own systems, to avoid needing to store Vouchsafe's own ID Provided at request time. */
  external_id: string | null;
  identity_profile?: IdentityProfile;
}

/**
 * Cast schema for the Verification model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const verification = core.cast.identity<Verification>();

/**
 * Cast schema for mapping API responses to the Verification application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const verificationResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'status',
      'created_at',
      'erased_at',
      'erased_by',
      'expires_at',
      'email',
      'redirect_url',
      'pending_redirect_url',
      'failure_redirect_url',
      'flow_id',
      'workflow_id',
      'external_id',
      'identity_profile',
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
      status: raw['status'],
      created_at: raw['created_at'],
      erased_at: raw['erased_at'],
      erased_by: raw['erased_by'],
      expires_at: raw['expires_at'],
      email: raw['email'],
      redirect_url: raw['redirect_url'],
      pending_redirect_url: raw['pending_redirect_url'],
      failure_redirect_url: raw['failure_redirect_url'],
      flow_id: raw['flow_id'],
      workflow_id: raw['workflow_id'],
      external_id: raw['external_id'],
      identity_profile: raw['identity_profile'],
    };
  },
  [
    'id',
    'status',
    'created_at',
    'expires_at',
    'email',
    'redirect_url',
    'pending_redirect_url',
    'failure_redirect_url',
    'external_id',
  ],
);

/**
 * Cast schema for mapping the Verification application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const verificationRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      status: raw['status'],
      created_at: raw['created_at'],
      erased_at: raw['erased_at'],
      erased_by: raw['erased_by'],
      expires_at: raw['expires_at'],
      email: raw['email'],
      redirect_url: raw['redirect_url'],
      pending_redirect_url: raw['pending_redirect_url'],
      failure_redirect_url: raw['failure_redirect_url'],
      flow_id: raw['flow_id'],
      workflow_id: raw['workflow_id'],
      external_id: raw['external_id'],
      identity_profile: raw['identity_profile'],
    };
  },
  [
    'id',
    'status',
    'created_at',
    'expires_at',
    'email',
    'redirect_url',
    'pending_redirect_url',
    'failure_redirect_url',
    'external_id',
  ],
);
