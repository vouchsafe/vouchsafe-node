import * as core from '../../../../core';
import {
  ValidationOutcomeApi,
  validationOutcomeApi,
  validationOutcomeApiRequest,
  validationOutcomeApiResponse,
} from './ValidationOutcomeApi';

export interface VouchValidationsApi {
  relationship_minimum_duration_met: ValidationOutcomeApi;
  approved_professional_domain?: ValidationOutcomeApi;
}

/**
 * Cast schema for the VouchValidationsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const vouchValidationsApi = core.cast.identity<VouchValidationsApi>();

/**
 * Cast schema for mapping API responses to the VouchValidationsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const vouchValidationsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'relationship_minimum_duration_met',
      'approved_professional_domain',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      relationship_minimum_duration_met:
        raw['relationship_minimum_duration_met'] == null
          ? raw['relationship_minimum_duration_met']
          : validationOutcomeApiResponse.parse(raw['relationship_minimum_duration_met']),
      approved_professional_domain:
        raw['approved_professional_domain'] == null
          ? raw['approved_professional_domain']
          : validationOutcomeApiResponse.parse(raw['approved_professional_domain']),
    };
  },
  ['relationship_minimum_duration_met'],
);

/**
 * Cast schema for mapping the VouchValidationsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const vouchValidationsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      relationship_minimum_duration_met:
        raw['relationship_minimum_duration_met'] == null
          ? raw['relationship_minimum_duration_met']
          : validationOutcomeApiRequest.parse(raw['relationship_minimum_duration_met']),
      approved_professional_domain:
        raw['approved_professional_domain'] == null
          ? raw['approved_professional_domain']
          : validationOutcomeApiRequest.parse(raw['approved_professional_domain']),
    };
  },
  ['relationship_minimum_duration_met'],
);
