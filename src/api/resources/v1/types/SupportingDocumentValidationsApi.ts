import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';

export interface SupportingDocumentValidationsApi {
  required_fields_extracted: ValidationOutcomeApi;
  category_match?: ValidationOutcomeApi;
  document_age_valid?: ValidationOutcomeApi;
  document_unique?: ValidationOutcomeApi;
  date_fields_valid?: ValidationOutcomeApi;
  names_consistent?: ValidationOutcomeApi;
  addresses_consistent?: ValidationOutcomeApi;
  dates_of_birth_consistent?: ValidationOutcomeApi;
  referee_biometrics_dissimilar?: ValidationOutcomeApi;
  document_complete_and_legible?: ValidationOutcomeApi;
  tampering_signals_check?: ValidationOutcomeApi;
}

/**
 * Cast schema for the SupportingDocumentValidationsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentValidationsApi =
  core.cast.identity<SupportingDocumentValidationsApi>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentValidationsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentValidationsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'required_fields_extracted',
      'category_match',
      'document_age_valid',
      'document_unique',
      'date_fields_valid',
      'names_consistent',
      'addresses_consistent',
      'dates_of_birth_consistent',
      'referee_biometrics_dissimilar',
      'document_complete_and_legible',
      'tampering_signals_check',
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
      category_match:
        raw['category_match'] == null
          ? raw['category_match']
          : validationOutcomeApiResponse.parse(raw['category_match']),
      document_age_valid:
        raw['document_age_valid'] == null
          ? raw['document_age_valid']
          : validationOutcomeApiResponse.parse(raw['document_age_valid']),
      document_unique:
        raw['document_unique'] == null
          ? raw['document_unique']
          : validationOutcomeApiResponse.parse(raw['document_unique']),
      date_fields_valid:
        raw['date_fields_valid'] == null
          ? raw['date_fields_valid']
          : validationOutcomeApiResponse.parse(raw['date_fields_valid']),
      names_consistent:
        raw['names_consistent'] == null
          ? raw['names_consistent']
          : validationOutcomeApiResponse.parse(raw['names_consistent']),
      addresses_consistent:
        raw['addresses_consistent'] == null
          ? raw['addresses_consistent']
          : validationOutcomeApiResponse.parse(raw['addresses_consistent']),
      dates_of_birth_consistent:
        raw['dates_of_birth_consistent'] == null
          ? raw['dates_of_birth_consistent']
          : validationOutcomeApiResponse.parse(raw['dates_of_birth_consistent']),
      referee_biometrics_dissimilar:
        raw['referee_biometrics_dissimilar'] == null
          ? raw['referee_biometrics_dissimilar']
          : validationOutcomeApiResponse.parse(raw['referee_biometrics_dissimilar']),
      document_complete_and_legible:
        raw['document_complete_and_legible'] == null
          ? raw['document_complete_and_legible']
          : validationOutcomeApiResponse.parse(raw['document_complete_and_legible']),
      tampering_signals_check:
        raw['tampering_signals_check'] == null
          ? raw['tampering_signals_check']
          : validationOutcomeApiResponse.parse(raw['tampering_signals_check']),
    };
  },
  ['required_fields_extracted'],
);

/**
 * Cast schema for mapping the SupportingDocumentValidationsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentValidationsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      required_fields_extracted:
        raw['required_fields_extracted'] == null
          ? raw['required_fields_extracted']
          : validationOutcomeApiRequest.parse(raw['required_fields_extracted']),
      category_match:
        raw['category_match'] == null
          ? raw['category_match']
          : validationOutcomeApiRequest.parse(raw['category_match']),
      document_age_valid:
        raw['document_age_valid'] == null
          ? raw['document_age_valid']
          : validationOutcomeApiRequest.parse(raw['document_age_valid']),
      document_unique:
        raw['document_unique'] == null
          ? raw['document_unique']
          : validationOutcomeApiRequest.parse(raw['document_unique']),
      date_fields_valid:
        raw['date_fields_valid'] == null
          ? raw['date_fields_valid']
          : validationOutcomeApiRequest.parse(raw['date_fields_valid']),
      names_consistent:
        raw['names_consistent'] == null
          ? raw['names_consistent']
          : validationOutcomeApiRequest.parse(raw['names_consistent']),
      addresses_consistent:
        raw['addresses_consistent'] == null
          ? raw['addresses_consistent']
          : validationOutcomeApiRequest.parse(raw['addresses_consistent']),
      dates_of_birth_consistent:
        raw['dates_of_birth_consistent'] == null
          ? raw['dates_of_birth_consistent']
          : validationOutcomeApiRequest.parse(raw['dates_of_birth_consistent']),
      referee_biometrics_dissimilar:
        raw['referee_biometrics_dissimilar'] == null
          ? raw['referee_biometrics_dissimilar']
          : validationOutcomeApiRequest.parse(raw['referee_biometrics_dissimilar']),
      document_complete_and_legible:
        raw['document_complete_and_legible'] == null
          ? raw['document_complete_and_legible']
          : validationOutcomeApiRequest.parse(raw['document_complete_and_legible']),
      tampering_signals_check:
        raw['tampering_signals_check'] == null
          ? raw['tampering_signals_check']
          : validationOutcomeApiRequest.parse(raw['tampering_signals_check']),
    };
  },
  ['required_fields_extracted'],
);
