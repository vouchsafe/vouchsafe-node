import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';
import {
  NecValidationApiDocumentBordersDetected,
  necValidationApiDocumentBordersDetected,
  necValidationApiDocumentBordersDetectedRequest,
  necValidationApiDocumentBordersDetectedResponse,
} from './NecValidationApiDocumentBordersDetected';
import {
  NecValidationApiFaceMatch,
  necValidationApiFaceMatch,
  necValidationApiFaceMatchRequest,
  necValidationApiFaceMatchResponse,
} from './NecValidationApiFaceMatch';
import { NecValidationApiDocumentBordersDetectedStatus } from './NecValidationApiDocumentBordersDetectedStatus';
import { NecValidationApiFaceMatchStatus } from './NecValidationApiFaceMatchStatus';

export interface NecValidationApi {
  required_fields_extracted?: ValidationOutcomeApi;
  photo_id_type_accepted?: ValidationOutcomeApi;
  issuing_country_allowed?: ValidationOutcomeApi;
  document_contains_face?: ValidationOutcomeApi;
  date_fields_valid?: ValidationOutcomeApi;
  not_sample_or_internal_use?: ValidationOutcomeApi;
  /** Whether the correct document dimensions were detected (with score). */
  document_borders_detected: NecValidationApiDocumentBordersDetected;
  /** Whether the photo ID face matches the video selfie (with score). */
  face_match?: NecValidationApiFaceMatch;
  dates_of_birth_consistent?: ValidationOutcomeApi;
  names_consistent?: ValidationOutcomeApi;
  referee_over_18?: ValidationOutcomeApi;
  referee_biometrics_dissimilar?: ValidationOutcomeApi;
  tampering_signals_check?: ValidationOutcomeApi;
  security_features_present: ValidationOutcomeApi;
  identifier_format_valid: ValidationOutcomeApi;
}

export namespace NecValidationApi {
  export interface DocumentBordersDetected {
    score: NecValidationApiDocumentBordersDetected['score'];
    status: NecValidationApiDocumentBordersDetected['status'];
  }
  export namespace DocumentBordersDetected {
    export type Status = NecValidationApiDocumentBordersDetectedStatus;
    export const Status = NecValidationApiDocumentBordersDetectedStatus;
  }
  export interface FaceMatch {
    score: NecValidationApiFaceMatch['score'];
    status: NecValidationApiFaceMatch['status'];
  }
  export namespace FaceMatch {
    export type Status = NecValidationApiFaceMatchStatus;
    export const Status = NecValidationApiFaceMatchStatus;
  }
}

/**
 * Cast schema for the NecValidationApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const necValidationApi = core.cast.identity<NecValidationApi>();

/**
 * Cast schema for mapping API responses to the NecValidationApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const necValidationApiResponse = core.cast.object(
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
      'security_features_present',
      'identifier_format_valid',
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
          : necValidationApiDocumentBordersDetectedResponse.parse(raw['document_borders_detected']),
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : necValidationApiFaceMatchResponse.parse(raw['face_match']),
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
      security_features_present:
        raw['security_features_present'] == null
          ? raw['security_features_present']
          : validationOutcomeApiResponse.parse(raw['security_features_present']),
      identifier_format_valid:
        raw['identifier_format_valid'] == null
          ? raw['identifier_format_valid']
          : validationOutcomeApiResponse.parse(raw['identifier_format_valid']),
    };
  },
  ['document_borders_detected', 'security_features_present', 'identifier_format_valid'],
);

/**
 * Cast schema for mapping the NecValidationApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const necValidationApiRequest = core.cast.object(
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
          : necValidationApiDocumentBordersDetectedRequest.parse(raw['document_borders_detected']),
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : necValidationApiFaceMatchRequest.parse(raw['face_match']),
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
      security_features_present:
        raw['security_features_present'] == null
          ? raw['security_features_present']
          : validationOutcomeApiRequest.parse(raw['security_features_present']),
      identifier_format_valid:
        raw['identifier_format_valid'] == null
          ? raw['identifier_format_valid']
          : validationOutcomeApiRequest.parse(raw['identifier_format_valid']),
    };
  },
  ['document_borders_detected', 'security_features_present', 'identifier_format_valid'],
);
