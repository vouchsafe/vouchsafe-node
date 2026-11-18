import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';
import {
  EvisaValidationsApiFaceMatch,
  evisaValidationsApiFaceMatch,
  evisaValidationsApiFaceMatchRequest,
  evisaValidationsApiFaceMatchResponse,
} from './EvisaValidationsApiFaceMatch';
import { EvisaValidationsApiFaceMatchStatus } from './EvisaValidationsApiFaceMatchStatus';

export interface EvisaValidationsApi {
  evisa_exists: ValidationOutcomeApi;
  required_fields_extracted: ValidationOutcomeApi;
  evisa_started?: ValidationOutcomeApi;
  evisa_not_expired: ValidationOutcomeApi;
  /** Whether the eVisa photo matches the video selfie (with score). */
  face_match?: EvisaValidationsApiFaceMatch;
}

export namespace EvisaValidationsApi {
  export interface FaceMatch {
    score: EvisaValidationsApiFaceMatch['score'];
    status: EvisaValidationsApiFaceMatch['status'];
  }
  export namespace FaceMatch {
    export type Status = EvisaValidationsApiFaceMatchStatus;
    export const Status = EvisaValidationsApiFaceMatchStatus;
  }
}

/**
 * Cast schema for the EvisaValidationsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaValidationsApi = core.cast.identity<EvisaValidationsApi>();

/**
 * Cast schema for mapping API responses to the EvisaValidationsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaValidationsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'evisa_exists',
      'required_fields_extracted',
      'evisa_started',
      'evisa_not_expired',
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
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : evisaValidationsApiFaceMatchResponse.parse(raw['face_match']),
    };
  },
  ['evisa_exists', 'required_fields_extracted', 'evisa_not_expired'],
);

/**
 * Cast schema for mapping the EvisaValidationsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaValidationsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
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
      face_match:
        raw['face_match'] == null
          ? raw['face_match']
          : evisaValidationsApiFaceMatchRequest.parse(raw['face_match']),
    };
  },
  ['evisa_exists', 'required_fields_extracted', 'evisa_not_expired'],
);
