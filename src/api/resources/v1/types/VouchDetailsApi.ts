import * as core from '../../../../core';
import { PersonalRelationshipApi, personalRelationshipApi } from './PersonalRelationshipApi';

export interface VouchDetailsApi {
  /** The referee verification ID. Results can be retrieved from the GetVerification endpoint. */
  referee_verification_id: string;
  relationship?: PersonalRelationshipApi | null;
  /** The referee's organisation when a professional referee is used. */
  organisation?: string | null;
}

/**
 * Cast schema for the VouchDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const vouchDetailsApi = core.cast.identity<VouchDetailsApi>();

/**
 * Cast schema for mapping API responses to the VouchDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const vouchDetailsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'referee_verification_id',
      'relationship',
      'organisation',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      referee_verification_id: raw['referee_verification_id'],
      relationship: raw['relationship'],
      organisation: raw['organisation'],
    };
  },
  ['referee_verification_id'],
);

/**
 * Cast schema for mapping the VouchDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const vouchDetailsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      referee_verification_id: raw['referee_verification_id'],
      relationship: raw['relationship'],
      organisation: raw['organisation'],
    };
  },
  ['referee_verification_id'],
);
