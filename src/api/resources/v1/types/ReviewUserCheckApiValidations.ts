import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';

/**
 * Claims being verified by the referee.
All claims "pass" when they accept and proceed, or "fail" when they reject.
Otherwise undefined while they have not made a choice yet.
 */
export interface ReviewUserCheckApiValidations {
  referee_confirmed_photo?: ValidationOutcomeApi;
  referee_confirmed_date_of_birth?: ValidationOutcomeApi;
  referee_confirmed_name?: ValidationOutcomeApi;
}

/**
 * Cast schema for the ReviewUserCheckApiValidations model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const reviewUserCheckApiValidations = core.cast.identity<ReviewUserCheckApiValidations>();

/**
 * Cast schema for mapping API responses to the ReviewUserCheckApiValidations application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const reviewUserCheckApiValidationsResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>([
    'referee_confirmed_photo',
    'referee_confirmed_date_of_birth',
    'referee_confirmed_name',
  ]);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    referee_confirmed_photo:
      raw['referee_confirmed_photo'] == null
        ? raw['referee_confirmed_photo']
        : validationOutcomeApiResponse.parse(raw['referee_confirmed_photo']),
    referee_confirmed_date_of_birth:
      raw['referee_confirmed_date_of_birth'] == null
        ? raw['referee_confirmed_date_of_birth']
        : validationOutcomeApiResponse.parse(raw['referee_confirmed_date_of_birth']),
    referee_confirmed_name:
      raw['referee_confirmed_name'] == null
        ? raw['referee_confirmed_name']
        : validationOutcomeApiResponse.parse(raw['referee_confirmed_name']),
  };
}, []);

/**
 * Cast schema for mapping the ReviewUserCheckApiValidations application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const reviewUserCheckApiValidationsRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return {
    referee_confirmed_photo:
      raw['referee_confirmed_photo'] == null
        ? raw['referee_confirmed_photo']
        : validationOutcomeApiRequest.parse(raw['referee_confirmed_photo']),
    referee_confirmed_date_of_birth:
      raw['referee_confirmed_date_of_birth'] == null
        ? raw['referee_confirmed_date_of_birth']
        : validationOutcomeApiRequest.parse(raw['referee_confirmed_date_of_birth']),
    referee_confirmed_name:
      raw['referee_confirmed_name'] == null
        ? raw['referee_confirmed_name']
        : validationOutcomeApiRequest.parse(raw['referee_confirmed_name']),
  };
}, []);
