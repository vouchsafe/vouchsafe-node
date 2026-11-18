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
  ImmigrationStatusEvisaStartedResult,
  immigrationStatusEvisaStartedResult,
  immigrationStatusEvisaStartedResultRequest,
  immigrationStatusEvisaStartedResultResponse,
} from './ImmigrationStatusEvisaStartedResult';
import {
  ImmigrationStatusEvisaNotExpiredResult,
  immigrationStatusEvisaNotExpiredResult,
  immigrationStatusEvisaNotExpiredResultRequest,
  immigrationStatusEvisaNotExpiredResultResponse,
} from './ImmigrationStatusEvisaNotExpiredResult';

export interface ImmigrationStatusEvisaValidations {
  evisa_exists?: EvisaExistsResult;
  required_fields_extracted?: EvisaRequiredFieldsExtractedResult;
  evisa_started?: ImmigrationStatusEvisaStartedResult;
  evisa_not_expired?: ImmigrationStatusEvisaNotExpiredResult;
}

/**
 * Cast schema for the ImmigrationStatusEvisaValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const immigrationStatusEvisaValidations =
  core.cast.identity<ImmigrationStatusEvisaValidations>();

/**
 * Cast schema for mapping API responses to the ImmigrationStatusEvisaValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const immigrationStatusEvisaValidationsResponse = core.cast.object((raw: any): any => {
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
        : immigrationStatusEvisaStartedResultResponse.parse(raw['evisa_started']),
    evisa_not_expired:
      raw['evisa_not_expired'] == null
        ? raw['evisa_not_expired']
        : immigrationStatusEvisaNotExpiredResultResponse.parse(raw['evisa_not_expired']),
  };
}, []);

/**
 * Cast schema for mapping the ImmigrationStatusEvisaValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const immigrationStatusEvisaValidationsRequest = core.cast.object((raw: any): any => {
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
        : immigrationStatusEvisaStartedResultRequest.parse(raw['evisa_started']),
    evisa_not_expired:
      raw['evisa_not_expired'] == null
        ? raw['evisa_not_expired']
        : immigrationStatusEvisaNotExpiredResultRequest.parse(raw['evisa_not_expired']),
  };
}, []);
