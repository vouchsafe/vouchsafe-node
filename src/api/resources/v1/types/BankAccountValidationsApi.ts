import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';

export interface BankAccountValidationsApi {
  required_fields_extracted: ValidationOutcomeApi;
  has_recent_transactions: ValidationOutcomeApi;
  non_zero_balance: ValidationOutcomeApi;
  names_consistent?: ValidationOutcomeApi;
  referee_biometrics_dissimilar?: ValidationOutcomeApi;
}

/**
 * Cast schema for the BankAccountValidationsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const bankAccountValidationsApi = core.cast.identity<BankAccountValidationsApi>();

/**
 * Cast schema for mapping API responses to the BankAccountValidationsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const bankAccountValidationsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'required_fields_extracted',
      'has_recent_transactions',
      'non_zero_balance',
      'names_consistent',
      'referee_biometrics_dissimilar',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      required_fields_extracted:
        raw['required_fields_extracted'] == null
          ? raw['required_fields_extracted']
          : validationOutcomeApiResponse.parse(raw['required_fields_extracted']),
      has_recent_transactions:
        raw['has_recent_transactions'] == null
          ? raw['has_recent_transactions']
          : validationOutcomeApiResponse.parse(raw['has_recent_transactions']),
      non_zero_balance:
        raw['non_zero_balance'] == null
          ? raw['non_zero_balance']
          : validationOutcomeApiResponse.parse(raw['non_zero_balance']),
      names_consistent:
        raw['names_consistent'] == null
          ? raw['names_consistent']
          : validationOutcomeApiResponse.parse(raw['names_consistent']),
      referee_biometrics_dissimilar:
        raw['referee_biometrics_dissimilar'] == null
          ? raw['referee_biometrics_dissimilar']
          : validationOutcomeApiResponse.parse(raw['referee_biometrics_dissimilar']),
    };
  },
  ['required_fields_extracted', 'has_recent_transactions', 'non_zero_balance'],
);

/**
 * Cast schema for mapping the BankAccountValidationsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const bankAccountValidationsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      required_fields_extracted:
        raw['required_fields_extracted'] == null
          ? raw['required_fields_extracted']
          : validationOutcomeApiRequest.parse(raw['required_fields_extracted']),
      has_recent_transactions:
        raw['has_recent_transactions'] == null
          ? raw['has_recent_transactions']
          : validationOutcomeApiRequest.parse(raw['has_recent_transactions']),
      non_zero_balance:
        raw['non_zero_balance'] == null
          ? raw['non_zero_balance']
          : validationOutcomeApiRequest.parse(raw['non_zero_balance']),
      names_consistent:
        raw['names_consistent'] == null
          ? raw['names_consistent']
          : validationOutcomeApiRequest.parse(raw['names_consistent']),
      referee_biometrics_dissimilar:
        raw['referee_biometrics_dissimilar'] == null
          ? raw['referee_biometrics_dissimilar']
          : validationOutcomeApiRequest.parse(raw['referee_biometrics_dissimilar']),
    };
  },
  ['required_fields_extracted', 'has_recent_transactions', 'non_zero_balance'],
);
