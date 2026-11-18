import * as core from '../../../../core';
import {
  CheckMrzPhotoIdFailedReason,
  checkMrzPhotoIdFailedReason,
  checkMrzPhotoIdFailedReasonRequest,
  checkMrzPhotoIdFailedReasonResponse,
} from './CheckMrzPhotoIdFailedReason';
import {
  CompoundIdentifiersCheckMrzPhotoIdFailedReason,
  compoundIdentifiersCheckMrzPhotoIdFailedReason,
  compoundIdentifiersCheckMrzPhotoIdFailedReasonRequest,
  compoundIdentifiersCheckMrzPhotoIdFailedReasonResponse,
} from './CompoundIdentifiersCheckMrzPhotoIdFailedReason';
import {
  CheckSpecimenErrorCode,
  checkSpecimenErrorCode,
  checkSpecimenErrorCodeRequest,
  checkSpecimenErrorCodeResponse,
} from './CheckSpecimenErrorCode';
import {
  CheckTamperingErrorCode,
  checkTamperingErrorCode,
  checkTamperingErrorCodeRequest,
  checkTamperingErrorCodeResponse,
} from './CheckTamperingErrorCode';
import {
  ScoreCheckDocumentDimensionsErrorCode,
  scoreCheckDocumentDimensionsErrorCode,
  scoreCheckDocumentDimensionsErrorCodeRequest,
  scoreCheckDocumentDimensionsErrorCodeResponse,
} from './ScoreCheckDocumentDimensionsErrorCode';
import {
  CheckDocumentFaceErrorCode,
  checkDocumentFaceErrorCode,
  checkDocumentFaceErrorCodeRequest,
  checkDocumentFaceErrorCodeResponse,
} from './CheckDocumentFaceErrorCode';
import {
  ScoreCheckFaceMatchErrorCode,
  scoreCheckFaceMatchErrorCode,
  scoreCheckFaceMatchErrorCodeRequest,
  scoreCheckFaceMatchErrorCodeResponse,
} from './ScoreCheckFaceMatchErrorCode';
import {
  CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData,
  checkFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData,
  checkFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataRequest,
  checkFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataResponse,
} from './CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData';

export interface PassportValidation {
  required_fields_extracted: CheckMrzPhotoIdFailedReason;
  compound_identifiers_match: CompoundIdentifiersCheckMrzPhotoIdFailedReason;
  has_not_expired: CheckMrzPhotoIdFailedReason;
  not_specimen: CheckSpecimenErrorCode;
  not_screenshot: CheckTamperingErrorCode;
  document_dimensions_matched: ScoreCheckDocumentDimensionsErrorCode;
  document_contains_face: CheckDocumentFaceErrorCode;
  face_match?: ScoreCheckFaceMatchErrorCode;
  icao_format_valid: CheckFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData;
}

/**
 * Cast schema for the PassportValidation model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const passportValidation = core.cast.identity<PassportValidation>();

/**
 * Cast schema for mapping API responses to the PassportValidation application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const passportValidationResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'required_fields_extracted',
      'compound_identifiers_match',
      'has_not_expired',
      'not_specimen',
      'not_screenshot',
      'document_dimensions_matched',
      'document_contains_face',
      'face_match',
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
      required_fields_extracted: raw['required_fields_extracted'],
      compound_identifiers_match:
        raw['compound_identifiers_match'] == null
          ? raw['compound_identifiers_match']
          : compoundIdentifiersCheckMrzPhotoIdFailedReasonResponse.parse(
              raw['compound_identifiers_match'],
            ),
      has_not_expired: raw['has_not_expired'],
      not_specimen: raw['not_specimen'],
      not_screenshot: raw['not_screenshot'],
      document_dimensions_matched:
        raw['document_dimensions_matched'] == null
          ? raw['document_dimensions_matched']
          : scoreCheckDocumentDimensionsErrorCodeResponse.parse(raw['document_dimensions_matched']),
      document_contains_face: raw['document_contains_face'],
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : scoreCheckFaceMatchErrorCodeResponse.parse(raw['face_match']),
      icao_format_valid: raw['icao_format_valid'],
    };
  },
  [
    'required_fields_extracted',
    'compound_identifiers_match',
    'has_not_expired',
    'not_specimen',
    'not_screenshot',
    'document_dimensions_matched',
    'document_contains_face',
    'icao_format_valid',
  ],
);

/**
 * Cast schema for mapping the PassportValidation application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const passportValidationRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      required_fields_extracted: raw['required_fields_extracted'],
      compound_identifiers_match:
        raw['compound_identifiers_match'] == null
          ? raw['compound_identifiers_match']
          : compoundIdentifiersCheckMrzPhotoIdFailedReasonRequest.parse(
              raw['compound_identifiers_match'],
            ),
      has_not_expired: raw['has_not_expired'],
      not_specimen: raw['not_specimen'],
      not_screenshot: raw['not_screenshot'],
      document_dimensions_matched:
        raw['document_dimensions_matched'] == null
          ? raw['document_dimensions_matched']
          : scoreCheckDocumentDimensionsErrorCodeRequest.parse(raw['document_dimensions_matched']),
      document_contains_face: raw['document_contains_face'],
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : scoreCheckFaceMatchErrorCodeRequest.parse(raw['face_match']),
      icao_format_valid: raw['icao_format_valid'],
    };
  },
  [
    'required_fields_extracted',
    'compound_identifiers_match',
    'has_not_expired',
    'not_specimen',
    'not_screenshot',
    'document_dimensions_matched',
    'document_contains_face',
    'icao_format_valid',
  ],
);
