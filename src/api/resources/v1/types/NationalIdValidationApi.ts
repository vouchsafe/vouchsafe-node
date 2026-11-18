import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';
import {
  NationalIdValidationApiDocumentBordersDetected,
  nationalIdValidationApiDocumentBordersDetected,
  nationalIdValidationApiDocumentBordersDetectedRequest,
  nationalIdValidationApiDocumentBordersDetectedResponse,
} from './NationalIdValidationApiDocumentBordersDetected';
import {
  NationalIdValidationApiFaceMatch,
  nationalIdValidationApiFaceMatch,
  nationalIdValidationApiFaceMatchRequest,
  nationalIdValidationApiFaceMatchResponse,
} from './NationalIdValidationApiFaceMatch';
import { NationalIdValidationApiDocumentBordersDetectedStatus } from './NationalIdValidationApiDocumentBordersDetectedStatus';
import { NationalIdValidationApiFaceMatchStatus } from './NationalIdValidationApiFaceMatchStatus';

export interface NationalIdValidationApi {
  required_fields_extracted?: ValidationOutcomeApi;
  photo_id_type_accepted?: ValidationOutcomeApi;
  issuing_country_allowed: ValidationOutcomeApi;
  document_contains_face?: ValidationOutcomeApi;
  date_fields_valid?: ValidationOutcomeApi;
  not_sample_or_internal_use?: ValidationOutcomeApi;
  /** Whether the correct document dimensions were detected (with score). */
  document_borders_detected: NationalIdValidationApiDocumentBordersDetected;
  /** Whether the photo ID face matches the video selfie (with score). */
  face_match?: NationalIdValidationApiFaceMatch;
  dates_of_birth_consistent?: ValidationOutcomeApi;
  names_consistent?: ValidationOutcomeApi;
  referee_over_18?: ValidationOutcomeApi;
  referee_biometrics_dissimilar?: ValidationOutcomeApi;
  tampering_signals_check?: ValidationOutcomeApi;
  compound_identifiers_match: ValidationOutcomeApi;
  has_not_expired?: ValidationOutcomeApi;
  icao_format_valid: ValidationOutcomeApi;
}

export namespace NationalIdValidationApi {
  export interface DocumentBordersDetected {
    score: NationalIdValidationApiDocumentBordersDetected['score'];
    status: NationalIdValidationApiDocumentBordersDetected['status'];
  }
  export namespace DocumentBordersDetected {
    export type Status = NationalIdValidationApiDocumentBordersDetectedStatus;
    export const Status = NationalIdValidationApiDocumentBordersDetectedStatus;
  }
  export interface FaceMatch {
    score: NationalIdValidationApiFaceMatch['score'];
    status: NationalIdValidationApiFaceMatch['status'];
  }
  export namespace FaceMatch {
    export type Status = NationalIdValidationApiFaceMatchStatus;
    export const Status = NationalIdValidationApiFaceMatchStatus;
  }
}

/**
 * Cast schema for the NationalIdValidationApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const nationalIdValidationApi = core.cast.identity<NationalIdValidationApi>();

/**
 * Cast schema for mapping API responses to the NationalIdValidationApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const nationalIdValidationApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'required_fields_extracted',
      'photo_id_type_accepted',
      'issuing_country_allowed',
      'document_contains_face',
      'date_fields_valid',
      'not_sample_or_internal_use',
      'document_borders_detected',
      'face_match',
      'dates_of_birth_consistent',
      'names_consistent',
      'referee_over_18',
      'referee_biometrics_dissimilar',
      'tampering_signals_check',
      'compound_identifiers_match',
      'has_not_expired',
      'icao_format_valid',
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
      photo_id_type_accepted:
        raw['photo_id_type_accepted'] == null
          ? raw['photo_id_type_accepted']
          : validationOutcomeApiResponse.parse(raw['photo_id_type_accepted']),
      issuing_country_allowed:
        raw['issuing_country_allowed'] == null
          ? raw['issuing_country_allowed']
          : validationOutcomeApiResponse.parse(raw['issuing_country_allowed']),
      document_contains_face:
        raw['document_contains_face'] == null
          ? raw['document_contains_face']
          : validationOutcomeApiResponse.parse(raw['document_contains_face']),
      date_fields_valid:
        raw['date_fields_valid'] == null
          ? raw['date_fields_valid']
          : validationOutcomeApiResponse.parse(raw['date_fields_valid']),
      not_sample_or_internal_use:
        raw['not_sample_or_internal_use'] == null
          ? raw['not_sample_or_internal_use']
          : validationOutcomeApiResponse.parse(raw['not_sample_or_internal_use']),
      document_borders_detected:
        raw['document_borders_detected'] == null
          ? raw['document_borders_detected']
          : nationalIdValidationApiDocumentBordersDetectedResponse.parse(
              raw['document_borders_detected'],
            ),
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : nationalIdValidationApiFaceMatchResponse.parse(raw['face_match']),
      dates_of_birth_consistent:
        raw['dates_of_birth_consistent'] == null
          ? raw['dates_of_birth_consistent']
          : validationOutcomeApiResponse.parse(raw['dates_of_birth_consistent']),
      names_consistent:
        raw['names_consistent'] == null
          ? raw['names_consistent']
          : validationOutcomeApiResponse.parse(raw['names_consistent']),
      referee_over_18:
        raw['referee_over_18'] == null
          ? raw['referee_over_18']
          : validationOutcomeApiResponse.parse(raw['referee_over_18']),
      referee_biometrics_dissimilar:
        raw['referee_biometrics_dissimilar'] == null
          ? raw['referee_biometrics_dissimilar']
          : validationOutcomeApiResponse.parse(raw['referee_biometrics_dissimilar']),
      tampering_signals_check:
        raw['tampering_signals_check'] == null
          ? raw['tampering_signals_check']
          : validationOutcomeApiResponse.parse(raw['tampering_signals_check']),
      compound_identifiers_match:
        raw['compound_identifiers_match'] == null
          ? raw['compound_identifiers_match']
          : validationOutcomeApiResponse.parse(raw['compound_identifiers_match']),
      has_not_expired:
        raw['has_not_expired'] == null
          ? raw['has_not_expired']
          : validationOutcomeApiResponse.parse(raw['has_not_expired']),
      icao_format_valid:
        raw['icao_format_valid'] == null
          ? raw['icao_format_valid']
          : validationOutcomeApiResponse.parse(raw['icao_format_valid']),
    };
  },
  [
    'issuing_country_allowed',
    'document_borders_detected',
    'compound_identifiers_match',
    'icao_format_valid',
  ],
);

/**
 * Cast schema for mapping the NationalIdValidationApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const nationalIdValidationApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      required_fields_extracted:
        raw['required_fields_extracted'] == null
          ? raw['required_fields_extracted']
          : validationOutcomeApiRequest.parse(raw['required_fields_extracted']),
      photo_id_type_accepted:
        raw['photo_id_type_accepted'] == null
          ? raw['photo_id_type_accepted']
          : validationOutcomeApiRequest.parse(raw['photo_id_type_accepted']),
      issuing_country_allowed:
        raw['issuing_country_allowed'] == null
          ? raw['issuing_country_allowed']
          : validationOutcomeApiRequest.parse(raw['issuing_country_allowed']),
      document_contains_face:
        raw['document_contains_face'] == null
          ? raw['document_contains_face']
          : validationOutcomeApiRequest.parse(raw['document_contains_face']),
      date_fields_valid:
        raw['date_fields_valid'] == null
          ? raw['date_fields_valid']
          : validationOutcomeApiRequest.parse(raw['date_fields_valid']),
      not_sample_or_internal_use:
        raw['not_sample_or_internal_use'] == null
          ? raw['not_sample_or_internal_use']
          : validationOutcomeApiRequest.parse(raw['not_sample_or_internal_use']),
      document_borders_detected:
        raw['document_borders_detected'] == null
          ? raw['document_borders_detected']
          : nationalIdValidationApiDocumentBordersDetectedRequest.parse(
              raw['document_borders_detected'],
            ),
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : nationalIdValidationApiFaceMatchRequest.parse(raw['face_match']),
      dates_of_birth_consistent:
        raw['dates_of_birth_consistent'] == null
          ? raw['dates_of_birth_consistent']
          : validationOutcomeApiRequest.parse(raw['dates_of_birth_consistent']),
      names_consistent:
        raw['names_consistent'] == null
          ? raw['names_consistent']
          : validationOutcomeApiRequest.parse(raw['names_consistent']),
      referee_over_18:
        raw['referee_over_18'] == null
          ? raw['referee_over_18']
          : validationOutcomeApiRequest.parse(raw['referee_over_18']),
      referee_biometrics_dissimilar:
        raw['referee_biometrics_dissimilar'] == null
          ? raw['referee_biometrics_dissimilar']
          : validationOutcomeApiRequest.parse(raw['referee_biometrics_dissimilar']),
      tampering_signals_check:
        raw['tampering_signals_check'] == null
          ? raw['tampering_signals_check']
          : validationOutcomeApiRequest.parse(raw['tampering_signals_check']),
      compound_identifiers_match:
        raw['compound_identifiers_match'] == null
          ? raw['compound_identifiers_match']
          : validationOutcomeApiRequest.parse(raw['compound_identifiers_match']),
      has_not_expired:
        raw['has_not_expired'] == null
          ? raw['has_not_expired']
          : validationOutcomeApiRequest.parse(raw['has_not_expired']),
      icao_format_valid:
        raw['icao_format_valid'] == null
          ? raw['icao_format_valid']
          : validationOutcomeApiRequest.parse(raw['icao_format_valid']),
    };
  },
  [
    'issuing_country_allowed',
    'document_borders_detected',
    'compound_identifiers_match',
    'icao_format_valid',
  ],
);
