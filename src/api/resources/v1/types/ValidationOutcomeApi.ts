import * as core from '../../../../core';
import {
  ValidationOutcomeApiStatus,
  validationOutcomeApiStatus,
} from './ValidationOutcomeApiStatus';

export interface ValidationOutcomeApi {
  status: ValidationOutcomeApiStatus;
  /** A short, machine-readable code for why the check failed, such as `EXPIRY_DATE_PASSED`. */
  failed_reason?: string;
}

export namespace ValidationOutcomeApi {
  export type Status = ValidationOutcomeApiStatus;
  export const Status = ValidationOutcomeApiStatus;
}

/**
 * Cast schema for the ValidationOutcomeApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const validationOutcomeApi = core.cast.identity<ValidationOutcomeApi>();

/**
 * Cast schema for mapping API responses to the ValidationOutcomeApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const validationOutcomeApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['status', 'failed_reason']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, status: raw['status'], failed_reason: raw['failed_reason'] };
  },
  ['status'],
);

/**
 * Cast schema for mapping the ValidationOutcomeApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const validationOutcomeApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { status: raw['status'], failed_reason: raw['failed_reason'] };
  },
  ['status'],
);
