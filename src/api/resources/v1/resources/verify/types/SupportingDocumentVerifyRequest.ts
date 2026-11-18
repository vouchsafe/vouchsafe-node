import * as core from '../../../../../../core';

export interface SupportingDocumentVerifyRequest {
  /** The document file (PDF, JPG, or PNG, max 10MB) */
  document: core.file.Uploadable;
  /** The type of document (e.g., BankStatement, UtilityBill) */
  sub_type: string;
  /** Minimum document age in months (optional) */
  minimum_document_length?: string;
}

/**
 * Cast schema for the SupportingDocumentVerifyRequest model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentVerifyRequest =
  core.cast.identity<SupportingDocumentVerifyRequest>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentVerifyRequest application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentVerifyRequestResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['document', 'sub_type', 'minimum_document_length']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      document: raw['document'],
      sub_type: raw['sub_type'],
      minimum_document_length: raw['minimum_document_length'],
    };
  },
  ['document', 'sub_type'],
);

/**
 * Cast schema for mapping the SupportingDocumentVerifyRequest application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentVerifyRequestRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      document: raw['document'],
      sub_type: raw['sub_type'],
      minimum_document_length: raw['minimum_document_length'],
    };
  },
  ['document', 'sub_type'],
);
