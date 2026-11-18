import * as core from '../../../../core';
import {
  AddressDetailsApi,
  addressDetailsApi,
  addressDetailsApiRequest,
  addressDetailsApiResponse,
} from './AddressDetailsApi';
import {
  EvisaConditionsApi,
  evisaConditionsApi,
  evisaConditionsApiRequest,
  evisaConditionsApiResponse1,
} from './EvisaConditionsApi';

export interface DigitalIdExtractedDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Date of birth (YYYY-MM-DD), if extracted. Otherwise null. */
  date_of_birth: string | null;
  /** First line of address, if extracted. Otherwise null. */
  first_line_of_address: string | null;
  /** Postcode, if extracted. Otherwise null. */
  postcode: string | null;
  address?: AddressDetailsApi | null;
  /** Phone number, if provided by the provider. */
  phone_number?: string;
  /** Nationality, if provided by the provider. */
  nationality?: string;
  /** Document number, if provided by the provider. */
  document_number?: string;
  /** Document type (for example IdCard), if provided by the provider. */
  document_type?: string;
  /** Document issue date (YYYY-MM-DD), if provided by the provider. */
  issue_date?: string;
  /** Document expiration date (YYYY-MM-DD), if provided by the provider. */
  expiration_date?: string;
  /** Issuing country, if provided by the provider. */
  issuing_country?: string;
  /** Immigration status, if provided by the provider (eVisa flows). */
  immigration_status?: string;
  /** UK Home Office share code. Only present for eVisa flows. */
  share_code?: string;
  /** GOV.UK reference number for the check. Only present for eVisa flows. */
  reference_number?: string;
  /** Start date (YYYY-MM-DD) of the immigration permission. Only present for ImmigrationStatus and RightToRent eVisa flows. */
  valid_from?: string;
  evisa_conditions?: EvisaConditionsApi;
}

/**
 * Cast schema for the DigitalIdExtractedDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const digitalIdExtractedDetailsApi = core.cast.identity<DigitalIdExtractedDetailsApi>();

/**
 * Cast schema for mapping API responses to the DigitalIdExtractedDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const digitalIdExtractedDetailsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'date_of_birth',
      'first_line_of_address',
      'postcode',
      'address',
      'phone_number',
      'nationality',
      'document_number',
      'document_type',
      'issue_date',
      'expiration_date',
      'issuing_country',
      'immigration_status',
      'share_code',
      'reference_number',
      'valid_from',
      'evisa_conditions',
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
      date_of_birth: raw['date_of_birth'],
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      address:
        raw['address'] == null ? raw['address'] : addressDetailsApiResponse.parse(raw['address']),
      phone_number: raw['phone_number'],
      nationality: raw['nationality'],
      document_number: raw['document_number'],
      document_type: raw['document_type'],
      issue_date: raw['issue_date'],
      expiration_date: raw['expiration_date'],
      issuing_country: raw['issuing_country'],
      immigration_status: raw['immigration_status'],
      share_code: raw['share_code'],
      reference_number: raw['reference_number'],
      valid_from: raw['valid_from'],
      evisa_conditions: raw['evisa_conditions'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'first_line_of_address', 'postcode'],
);

/**
 * Cast schema for mapping the DigitalIdExtractedDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const digitalIdExtractedDetailsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      address:
        raw['address'] == null ? raw['address'] : addressDetailsApiRequest.parse(raw['address']),
      phone_number: raw['phone_number'],
      nationality: raw['nationality'],
      document_number: raw['document_number'],
      document_type: raw['document_type'],
      issue_date: raw['issue_date'],
      expiration_date: raw['expiration_date'],
      issuing_country: raw['issuing_country'],
      immigration_status: raw['immigration_status'],
      share_code: raw['share_code'],
      reference_number: raw['reference_number'],
      valid_from: raw['valid_from'],
      evisa_conditions: raw['evisa_conditions'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'first_line_of_address', 'postcode'],
);
