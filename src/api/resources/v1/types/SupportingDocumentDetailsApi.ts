import * as core from '../../../../core';
import {
  AddressDetailsApi,
  addressDetailsApi,
  addressDetailsApiRequest,
  addressDetailsApiResponse,
} from './AddressDetailsApi';
import {
  SupportingDocumentEvidenceApi,
  supportingDocumentEvidenceApi,
} from './SupportingDocumentEvidenceApi';

export interface SupportingDocumentDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Date of birth, if birth certificate was used. */
  date_of_birth?: string | null;
  /** First line of address, if extracted. Otherwise null. */
  first_line_of_address?: string | null;
  /** Postcode, if extracted. Otherwise null. */
  postcode?: string | null;
  address?: AddressDetailsApi | null;
  document_category: SupportingDocumentEvidenceApi | null;
  /** The date of the document. */
  document_date: string | null;
  /** The issuer of the document. */
  issuer: string | null;
}

/**
 * Cast schema for the SupportingDocumentDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentDetailsApi = core.cast.identity<SupportingDocumentDetailsApi>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentDetailsApiResponse = core.cast.object(
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
      'document_category',
      'document_date',
      'issuer',
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
      document_category: raw['document_category'],
      document_date: raw['document_date'],
      issuer: raw['issuer'],
    };
  },
  ['first_name', 'last_name', 'document_category', 'document_date', 'issuer'],
);

/**
 * Cast schema for mapping the SupportingDocumentDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentDetailsApiRequest = core.cast.object(
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
      document_category: raw['document_category'],
      document_date: raw['document_date'],
      issuer: raw['issuer'],
    };
  },
  ['first_name', 'last_name', 'document_category', 'document_date', 'issuer'],
);
