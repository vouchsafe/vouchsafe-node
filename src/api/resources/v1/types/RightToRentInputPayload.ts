import * as core from '../../../../core';
import {
  RightToRentInputPayloadRole,
  rightToRentInputPayloadRole,
} from './RightToRentInputPayloadRole';

export interface RightToRentInputPayload {
  /** Role of the person requesting the verification */
  role: RightToRentInputPayloadRole;
  /** Name of the company or agency requesting the verification */
  company_name: string;
  /** Date of birth in YYYY-MM-DD or ISO 8601 format */
  date_of_birth: string;
  /** The 9-character share code from the UK Home Office */
  share_code: string;
}

export namespace RightToRentInputPayload {
  export type Role = RightToRentInputPayloadRole;
  export const Role = RightToRentInputPayloadRole;
}

/**
 * Cast schema for the RightToRentInputPayload model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToRentInputPayload = core.cast.identity<RightToRentInputPayload>();

/**
 * Cast schema for mapping API responses to the RightToRentInputPayload application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToRentInputPayloadResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['role', 'company_name', 'date_of_birth', 'share_code']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      role: raw['role'],
      company_name: raw['company_name'],
      date_of_birth: raw['date_of_birth'],
      share_code: raw['share_code'],
    };
  },
  ['role', 'company_name', 'date_of_birth', 'share_code'],
);

/**
 * Cast schema for mapping the RightToRentInputPayload application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToRentInputPayloadRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      role: raw['role'],
      company_name: raw['company_name'],
      date_of_birth: raw['date_of_birth'],
      share_code: raw['share_code'],
    };
  },
  ['role', 'company_name', 'date_of_birth', 'share_code'],
);
