import * as core from '../../../../core';

export interface UnfamiliarPhotoIdExtractedDetails {
  /** Extracted first name, or null if unavailable. */
  first_name: string | null;
  /** Extracted last name, or null if unavailable. */
  last_name: string | null;
  /** Extracted card or document number, or null if unavailable. */
  document_number: string | null;
  /** Extracted date of birth (YYYY-MM-DD), or undefined if not available. */
  date_of_birth?: string;
  /** Extracted expiry date (YYYY-MM-DD), or undefined if not available. */
  expiration_date?: string;
}

/**
 * Cast schema for the UnfamiliarPhotoIdExtractedDetails model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const unfamiliarPhotoIdExtractedDetails =
  core.cast.identity<UnfamiliarPhotoIdExtractedDetails>();

/**
 * Cast schema for mapping API responses to the UnfamiliarPhotoIdExtractedDetails application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdExtractedDetailsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'document_number',
      'date_of_birth',
      'expiration_date',
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
      document_number: raw['document_number'],
      date_of_birth: raw['date_of_birth'],
      expiration_date: raw['expiration_date'],
    };
  },
  ['first_name', 'last_name', 'document_number'],
);

/**
 * Cast schema for mapping the UnfamiliarPhotoIdExtractedDetails application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdExtractedDetailsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      document_number: raw['document_number'],
      date_of_birth: raw['date_of_birth'],
      expiration_date: raw['expiration_date'],
    };
  },
  ['first_name', 'last_name', 'document_number'],
);
