import * as core from '../../../../core';
import {
  DrivingLicenceValidationApiFaceMatchStatus,
  drivingLicenceValidationApiFaceMatchStatus,
} from './DrivingLicenceValidationApiFaceMatchStatus';

/**
 * Whether the photo ID face matches the video selfie (with score).
 */
export interface DrivingLicenceValidationApiFaceMatch {
  score: number | null;
  status: DrivingLicenceValidationApiFaceMatchStatus;
}

export namespace DrivingLicenceValidationApiFaceMatch {
  export type Status = DrivingLicenceValidationApiFaceMatchStatus;
  export const Status = DrivingLicenceValidationApiFaceMatchStatus;
}

/**
 * Cast schema for the DrivingLicenceValidationApiFaceMatch model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const drivingLicenceValidationApiFaceMatch =
  core.cast.identity<DrivingLicenceValidationApiFaceMatch>();

/**
 * Cast schema for mapping API responses to the DrivingLicenceValidationApiFaceMatch application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const drivingLicenceValidationApiFaceMatchResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['score', 'status']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);

/**
 * Cast schema for mapping the DrivingLicenceValidationApiFaceMatch application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const drivingLicenceValidationApiFaceMatchRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { score: raw['score'], status: raw['status'] };
  },
  ['score', 'status'],
);
