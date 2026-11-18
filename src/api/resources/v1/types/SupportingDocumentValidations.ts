import * as core from '../../../../core';
import {
  RequiredFieldsExtractedResult,
  requiredFieldsExtractedResult,
  requiredFieldsExtractedResultRequest,
  requiredFieldsExtractedResultResponse,
} from './RequiredFieldsExtractedResult';
import {
  CategoryMatchResult,
  categoryMatchResult,
  categoryMatchResultRequest,
  categoryMatchResultResponse,
} from './CategoryMatchResult';
import {
  DocumentAgeValidResult,
  documentAgeValidResult,
  documentAgeValidResultRequest,
  documentAgeValidResultResponse,
} from './DocumentAgeValidResult';
import {
  DocumentCompleteAndLegibleResult,
  documentCompleteAndLegibleResult,
  documentCompleteAndLegibleResultRequest,
  documentCompleteAndLegibleResultResponse,
} from './DocumentCompleteAndLegibleResult';
import {
  TamperingSignalsCheckResult,
  tamperingSignalsCheckResult,
  tamperingSignalsCheckResultRequest,
  tamperingSignalsCheckResultResponse,
} from './TamperingSignalsCheckResult';

export interface SupportingDocumentValidations {
  required_fields_extracted?: RequiredFieldsExtractedResult;
  category_match?: CategoryMatchResult;
  document_age_valid?: DocumentAgeValidResult;
  document_complete_and_legible?: DocumentCompleteAndLegibleResult;
  tampering_signals_check?: TamperingSignalsCheckResult;
}

/**
 * Cast schema for the SupportingDocumentValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const supportingDocumentValidations = core.cast.identity<SupportingDocumentValidations>();

/**
 * Cast schema for mapping API responses to the SupportingDocumentValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const supportingDocumentValidationsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'required_fields_extracted',
    'category_match',
    'document_age_valid',
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
        : requiredFieldsExtractedResultResponse.parse(raw['required_fields_extracted']),
    category_match:
      raw['category_match'] == null
        ? raw['category_match']
        : categoryMatchResultResponse.parse(raw['category_match']),
    document_age_valid:
      raw['document_age_valid'] == null
        ? raw['document_age_valid']
        : documentAgeValidResultResponse.parse(raw['document_age_valid']),
    document_complete_and_legible:
      raw['document_complete_and_legible'] == null
        ? raw['document_complete_and_legible']
        : documentCompleteAndLegibleResultResponse.parse(raw['document_complete_and_legible']),
    tampering_signals_check:
      raw['tampering_signals_check'] == null
        ? raw['tampering_signals_check']
        : tamperingSignalsCheckResultResponse.parse(raw['tampering_signals_check']),
  };
}, []);

/**
 * Cast schema for mapping the SupportingDocumentValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const supportingDocumentValidationsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    required_fields_extracted:
      raw['required_fields_extracted'] == null
        ? raw['required_fields_extracted']
        : requiredFieldsExtractedResultRequest.parse(raw['required_fields_extracted']),
    category_match:
      raw['category_match'] == null
        ? raw['category_match']
        : categoryMatchResultRequest.parse(raw['category_match']),
    document_age_valid:
      raw['document_age_valid'] == null
        ? raw['document_age_valid']
        : documentAgeValidResultRequest.parse(raw['document_age_valid']),
    document_complete_and_legible:
      raw['document_complete_and_legible'] == null
        ? raw['document_complete_and_legible']
        : documentCompleteAndLegibleResultRequest.parse(raw['document_complete_and_legible']),
    tampering_signals_check:
      raw['tampering_signals_check'] == null
        ? raw['tampering_signals_check']
        : tamperingSignalsCheckResultRequest.parse(raw['tampering_signals_check']),
  };
}, []);
