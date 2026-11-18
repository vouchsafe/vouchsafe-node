import * as core from '../../../../../../core';
import {
  AddressClaimInput,
  addressClaimInput,
  addressClaimInputRequest,
  addressClaimInputResponse,
} from '../../../types/AddressClaimInput';

export interface RequestVerificationInput {
  /** The user's email address. */
  email: string;
  /** The user's first name, if you have it. */
  first_name?: string;
  /** The user's last name, if you have it. */
  last_name?: string;
  address?: AddressClaimInput;
  /** To be deprecated. Use `address` instead. */
  street_address?: string;
  /** To be deprecated. Use `address` instead. */
  postcode?: string;
  /** The user's date of birth, if you have it. Format as YYYY-MM-DD or ISO 8601 */
  date_of_birth?: string;
  /** Which verification flow to use.

Get the flow ID from the URL of the flows page.

For example: `/admin/teams/abc123/flows/[flow_id]`

If not provided, the last published flow is used instead. */
  flow_id?: string;
  /** To be deprecated - Use flow_id instead. */
  workflow_id?: string;
  /** An identifier from your own systems, to avoid needing to store Vouchsafe's own ID. */
  external_id?: string;
  /** A generic or unique URL to send the user back to once they're verified.

If not provided, the verification flow default will be used. */
  redirect_url?: string;
  /** A generic or unique URL to send the user back to once they've submitted but aren't verified yet, e.g. awaiting review.

If not provided, the verification flow default will be used. */
  pending_redirect_url?: string;
  /** A generic or unique URL to send the user back to if they're refused.

If not provided, the verification flow default will be used. */
  failure_redirect_url?: string;
  /** When the verification session expires and the user stops getting reminders.

If provided, this overrides the verification flow default. Format as ISO 8601 */
  expires_at?: string;
}

/**
 * Cast schema for the RequestVerificationInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const requestVerificationInput = core.cast.identity<RequestVerificationInput>();

/**
 * Cast schema for mapping API responses to the RequestVerificationInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const requestVerificationInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'email',
      'first_name',
      'last_name',
      'address',
      'street_address',
      'postcode',
      'date_of_birth',
      'flow_id',
      'workflow_id',
      'external_id',
      'redirect_url',
      'pending_redirect_url',
      'failure_redirect_url',
      'expires_at',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      email: raw['email'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      address:
        raw['address'] == null ? raw['address'] : addressClaimInputResponse.parse(raw['address']),
      street_address: raw['street_address'],
      postcode: raw['postcode'],
      date_of_birth: raw['date_of_birth'],
      flow_id: raw['flow_id'],
      workflow_id: raw['workflow_id'],
      external_id: raw['external_id'],
      redirect_url: raw['redirect_url'],
      pending_redirect_url: raw['pending_redirect_url'],
      failure_redirect_url: raw['failure_redirect_url'],
      expires_at: raw['expires_at'],
    };
  },
  ['email'],
);

/**
 * Cast schema for mapping the RequestVerificationInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const requestVerificationInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      email: raw['email'],
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      address:
        raw['address'] == null ? raw['address'] : addressClaimInputRequest.parse(raw['address']),
      street_address: raw['street_address'],
      postcode: raw['postcode'],
      date_of_birth: raw['date_of_birth'],
      flow_id: raw['flow_id'],
      workflow_id: raw['workflow_id'],
      external_id: raw['external_id'],
      redirect_url: raw['redirect_url'],
      pending_redirect_url: raw['pending_redirect_url'],
      failure_redirect_url: raw['failure_redirect_url'],
      expires_at: raw['expires_at'],
    };
  },
  ['email'],
);
