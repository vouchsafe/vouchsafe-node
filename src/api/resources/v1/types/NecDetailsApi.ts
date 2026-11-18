import * as core from '../../../../core';

export interface NecDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Date of birth, if extracted. Otherwise null. */
  date_of_birth: string | null;
  /** Card number (16 digits), if extracted. Otherwise null. */
  document_number: string | null;
  /** ITSO Shell Reference Number (18 digits), if extracted. Otherwise null. */
  smart_card_number: string | null;
}

/**
 * Cast schema for the NecDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const necDetailsApi = core.cast.identity<NecDetailsApi>();

/**
 * Cast schema for mapping API responses to the NecDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const necDetailsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'date_of_birth',
      'document_number',
      'smart_card_number',
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
      smart_card_number: raw['smart_card_number'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'document_number', 'smart_card_number'],
);

/**
 * Cast schema for mapping the NecDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const necDetailsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      date_of_birth: raw['date_of_birth'],
      document_number: raw['document_number'],
      smart_card_number: raw['smart_card_number'],
    };
  },
  ['first_name', 'last_name', 'date_of_birth', 'document_number', 'smart_card_number'],
);
