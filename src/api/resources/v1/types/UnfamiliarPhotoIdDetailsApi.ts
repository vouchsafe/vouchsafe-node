import * as core from '../../../../core';

export interface UnfamiliarPhotoIdDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Date of birth, if extracted. Otherwise null. */
  date_of_birth: string | null;
  /** Document number, if extracted. Otherwise null. */
  document_number: string | null;
  /** Expiry date, if present and extracted. Otherwise null. */
  expiration_date: string | null;
}

/**
 * Cast schema for the UnfamiliarPhotoIdDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const unfamiliarPhotoIdDetailsApi = core.cast.identity<UnfamiliarPhotoIdDetailsApi>();

/**
 * Cast schema for mapping API responses to the UnfamiliarPhotoIdDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdDetailsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'date_of_birth',
      'document_number',
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
      date_of_birth: raw['date_of_birth'],
      document_number: raw['document_number'],
      expiration_date: raw['expiration_date'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'document_number', 'expiration_date'],
);

/**
 * Cast schema for mapping the UnfamiliarPhotoIdDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdDetailsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      document_number: raw['document_number'],
      expiration_date: raw['expiration_date'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'document_number', 'expiration_date'],
);
