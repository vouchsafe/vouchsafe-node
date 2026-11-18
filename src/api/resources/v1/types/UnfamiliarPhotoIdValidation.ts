import * as core from '../../../../core';
import {
  CheckUnfamiliarPhotoIdFailedReason,
  checkUnfamiliarPhotoIdFailedReason,
  checkUnfamiliarPhotoIdFailedReasonRequest,
  checkUnfamiliarPhotoIdFailedReasonResponse,
} from './CheckUnfamiliarPhotoIdFailedReason';
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

export interface UnfamiliarPhotoIdValidation {
  required_fields_extracted: CheckUnfamiliarPhotoIdFailedReason;
  has_not_expired?: CheckUnfamiliarPhotoIdFailedReason;
  not_specimen: CheckSpecimenErrorCode;
  not_screenshot: CheckTamperingErrorCode;
  document_dimensions_matched: ScoreCheckDocumentDimensionsErrorCode;
  document_contains_face: CheckDocumentFaceErrorCode;
  face_match?: ScoreCheckFaceMatchErrorCode;
}

/**
 * Cast schema for the UnfamiliarPhotoIdValidation model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const unfamiliarPhotoIdValidation = core.cast.identity<UnfamiliarPhotoIdValidation>();

/**
 * Cast schema for mapping API responses to the UnfamiliarPhotoIdValidation application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdValidationResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'required_fields_extracted',
      'has_not_expired',
      'not_specimen',
      'not_screenshot',
      'document_dimensions_matched',
      'document_contains_face',
      'face_match',
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
    };
  },
  [
    'required_fields_extracted',
    'not_specimen',
    'not_screenshot',
    'document_dimensions_matched',
    'document_contains_face',
  ],
);

/**
 * Cast schema for mapping the UnfamiliarPhotoIdValidation application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const unfamiliarPhotoIdValidationRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      required_fields_extracted: raw['required_fields_extracted'],
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
    };
  },
  [
    'required_fields_extracted',
    'not_specimen',
    'not_screenshot',
    'document_dimensions_matched',
    'document_contains_face',
  ],
);
