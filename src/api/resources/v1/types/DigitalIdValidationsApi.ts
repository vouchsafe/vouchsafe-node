import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';

export interface DigitalIdValidationsApi {
  names_consistent?: ValidationOutcomeApi;
  has_not_expired?: ValidationOutcomeApi;
  evisa_exists?: ValidationOutcomeApi;
  required_fields_extracted?: ValidationOutcomeApi;
  evisa_started?: ValidationOutcomeApi;
  evisa_not_expired?: ValidationOutcomeApi;
}

/**
 * Cast schema for the DigitalIdValidationsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const digitalIdValidationsApi = core.cast.identity<DigitalIdValidationsApi>();

/**
 * Cast schema for mapping API responses to the DigitalIdValidationsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const digitalIdValidationsApiResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'names_consistent',
    'has_not_expired',
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
    names_consistent:
      raw['names_consistent'] == null
        ? raw['names_consistent']
        : validationOutcomeApiResponse.parse(raw['names_consistent']),
    has_not_expired:
      raw['has_not_expired'] == null
        ? raw['has_not_expired']
        : validationOutcomeApiResponse.parse(raw['has_not_expired']),
    evisa_exists:
      raw['evisa_exists'] == null
        ? raw['evisa_exists']
        : validationOutcomeApiResponse.parse(raw['evisa_exists']),
    required_fields_extracted:
      raw['required_fields_extracted'] == null
        ? raw['required_fields_extracted']
        : validationOutcomeApiResponse.parse(raw['required_fields_extracted']),
    evisa_started:
      raw['evisa_started'] == null
        ? raw['evisa_started']
        : validationOutcomeApiResponse.parse(raw['evisa_started']),
    evisa_not_expired:
      raw['evisa_not_expired'] == null
        ? raw['evisa_not_expired']
        : validationOutcomeApiResponse.parse(raw['evisa_not_expired']),
  };
}, []);

/**
 * Cast schema for mapping the DigitalIdValidationsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const digitalIdValidationsApiRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    names_consistent:
      raw['names_consistent'] == null
        ? raw['names_consistent']
        : validationOutcomeApiRequest.parse(raw['names_consistent']),
    has_not_expired:
      raw['has_not_expired'] == null
        ? raw['has_not_expired']
        : validationOutcomeApiRequest.parse(raw['has_not_expired']),
    evisa_exists:
      raw['evisa_exists'] == null
        ? raw['evisa_exists']
        : validationOutcomeApiRequest.parse(raw['evisa_exists']),
    required_fields_extracted:
      raw['required_fields_extracted'] == null
        ? raw['required_fields_extracted']
        : validationOutcomeApiRequest.parse(raw['required_fields_extracted']),
    evisa_started:
      raw['evisa_started'] == null
        ? raw['evisa_started']
        : validationOutcomeApiRequest.parse(raw['evisa_started']),
    evisa_not_expired:
      raw['evisa_not_expired'] == null
        ? raw['evisa_not_expired']
        : validationOutcomeApiRequest.parse(raw['evisa_not_expired']),
  };
}, []);
