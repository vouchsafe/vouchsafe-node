import * as core from '../../../../core';
import {
  EvisaExistsResult,
  evisaExistsResult,
  evisaExistsResultRequest,
  evisaExistsResultResponse,
} from './EvisaExistsResult';
import {
  EvisaRequiredFieldsExtractedResult,
  evisaRequiredFieldsExtractedResult,
  evisaRequiredFieldsExtractedResultRequest,
  evisaRequiredFieldsExtractedResultResponse,
} from './EvisaRequiredFieldsExtractedResult';
import {
  EvisaStartedResult,
  evisaStartedResult,
  evisaStartedResultRequest,
  evisaStartedResultResponse,
} from './EvisaStartedResult';
import {
  EvisaNotExpiredResult,
  evisaNotExpiredResult,
  evisaNotExpiredResultRequest,
  evisaNotExpiredResultResponse,
} from './EvisaNotExpiredResult';

export interface EvisaValidations {
  evisa_exists?: EvisaExistsResult;
  required_fields_extracted?: EvisaRequiredFieldsExtractedResult;
  evisa_started?: EvisaStartedResult;
  evisa_not_expired?: EvisaNotExpiredResult;
}

/**
 * Cast schema for the EvisaValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaValidations = core.cast.identity<EvisaValidations>();

/**
 * Cast schema for mapping API responses to the EvisaValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaValidationsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'evisa_exists',
    'required_fields_extracted',
    'evisa_started',
    'evisa_not_expired',
  ]);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    evisa_exists:
      raw['evisa_exists'] == null
        ? raw['evisa_exists']
        : evisaExistsResultResponse.parse(raw['evisa_exists']),
    required_fields_extracted:
      raw['required_fields_extracted'] == null
        ? raw['required_fields_extracted']
        : evisaRequiredFieldsExtractedResultResponse.parse(raw['required_fields_extracted']),
    evisa_started:
      raw['evisa_started'] == null
        ? raw['evisa_started']
        : evisaStartedResultResponse.parse(raw['evisa_started']),
    evisa_not_expired:
      raw['evisa_not_expired'] == null
        ? raw['evisa_not_expired']
        : evisaNotExpiredResultResponse.parse(raw['evisa_not_expired']),
  };
}, []);

/**
 * Cast schema for mapping the EvisaValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaValidationsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    evisa_exists:
      raw['evisa_exists'] == null
        ? raw['evisa_exists']
        : evisaExistsResultRequest.parse(raw['evisa_exists']),
    required_fields_extracted:
      raw['required_fields_extracted'] == null
        ? raw['required_fields_extracted']
        : evisaRequiredFieldsExtractedResultRequest.parse(raw['required_fields_extracted']),
    evisa_started:
      raw['evisa_started'] == null
        ? raw['evisa_started']
        : evisaStartedResultRequest.parse(raw['evisa_started']),
    evisa_not_expired:
      raw['evisa_not_expired'] == null
        ? raw['evisa_not_expired']
        : evisaNotExpiredResultRequest.parse(raw['evisa_not_expired']),
  };
}, []);
