import * as core from '../../../../core';

export interface ImmigrationStatusInputPayload {
  /** Reason for the verification (max 50 characters) */
  reason: string;
  /** Job title of the person conducting or responsible for the verification */
  job_title: string;
  /** Name of the company requesting the verification */
  company_name: string;
  /** Date of birth in YYYY-MM-DD or ISO 8601 format */
  date_of_birth: string;
  /** The 9-character share code from the UK Home Office */
  share_code: string;
}

/**
 * Cast schema for the ImmigrationStatusInputPayload model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const immigrationStatusInputPayload = core.cast.identity<ImmigrationStatusInputPayload>();

/**
 * Cast schema for mapping API responses to the ImmigrationStatusInputPayload application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const immigrationStatusInputPayloadResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'reason',
      'job_title',
      'company_name',
      'date_of_birth',
      'share_code',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      reason: raw['reason'],
      job_title: raw['job_title'],
      company_name: raw['company_name'],
      date_of_birth: raw['date_of_birth'],
      share_code: raw['share_code'],
    };
  },
  ['reason', 'job_title', 'company_name', 'date_of_birth', 'share_code'],
);

/**
 * Cast schema for mapping the ImmigrationStatusInputPayload application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const immigrationStatusInputPayloadRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      reason: raw['reason'],
      job_title: raw['job_title'],
      company_name: raw['company_name'],
      date_of_birth: raw['date_of_birth'],
      share_code: raw['share_code'],
    };
  },
  ['reason', 'job_title', 'company_name', 'date_of_birth', 'share_code'],
);
