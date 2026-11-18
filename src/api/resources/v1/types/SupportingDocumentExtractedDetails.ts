import * as core from '../../../../core';
import {
  SupportingDocumentExtractedAddress,
  supportingDocumentExtractedAddress,
  supportingDocumentExtractedAddressRequest,
  supportingDocumentExtractedAddressResponse,
} from './SupportingDocumentExtractedAddress';

/**
 * Extracted details from the supporting document
 */
export interface SupportingDocumentExtractedDetails {
  first_name: string | null;
  last_name: string | null;
  first_line_of_address: string | null;
  postcode: string | null;
  /** Structured addresses, named and shaped as in GET /smart-lookups/postcode.
Extraction produces at most one address; empty when no address fields
were extracted. */
  addresses_formatted: SupportingDocumentExtractedAddress[];
  document_date: string | null;
  document_category: string | null;
  unique_identifier: string | null;
  issuer: string | null;
}

/**
 * Cast schema for the SupportingDocumentExtractedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentExtractedDetails =
  core.cast.identity<SupportingDocumentExtractedDetails>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentExtractedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentExtractedDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'first_line_of_address',
      'postcode',
      'addresses_formatted',
      'document_date',
      'document_category',
      'unique_identifier',
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
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      addresses_formatted: Array.isArray(raw['addresses_formatted'])
        ? (raw['addresses_formatted'] as any[]).map((v: any) =>
            v == null ? v : supportingDocumentExtractedAddressResponse.parse(v),
          )
        : (raw['addresses_formatted'] as any),
      document_date: raw['document_date'],
      document_category: raw['document_category'],
      unique_identifier: raw['unique_identifier'],
      issuer: raw['issuer'],
    };
  },
  [
    'first_name',
    'last_name',
    'first_line_of_address',
    'postcode',
    'addresses_formatted',
    'document_date',
    'document_category',
    'unique_identifier',
    'issuer',
  ],
);

/**
 * Cast schema for mapping the SupportingDocumentExtractedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentExtractedDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      first_line_of_address: raw['first_line_of_address'],
      postcode: raw['postcode'],
      addresses_formatted: Array.isArray(raw['addresses_formatted'])
        ? (raw['addresses_formatted'] as any[]).map((v: any) =>
            v == null ? v : supportingDocumentExtractedAddressRequest.parse(v),
          )
        : (raw['addresses_formatted'] as any),
      document_date: raw['document_date'],
      document_category: raw['document_category'],
      unique_identifier: raw['unique_identifier'],
      issuer: raw['issuer'],
    };
  },
  [
    'first_name',
    'last_name',
    'first_line_of_address',
    'postcode',
    'addresses_formatted',
    'document_date',
    'document_category',
    'unique_identifier',
    'issuer',
  ],
);
