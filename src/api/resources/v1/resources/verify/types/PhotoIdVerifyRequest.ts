import * as core from '../../../../../../core';

export interface PhotoIdVerifyRequest {
  sub_type: string;
  front: core.file.Uploadable;
  back?: core.file.Uploadable;
  country_code?: string;
  face_scan?: core.file.Uploadable;
}

/**
 * Cast schema for the PhotoIdVerifyRequest model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const photoIdVerifyRequest = core.cast.identity<PhotoIdVerifyRequest>();

/**
 * Cast schema for mapping API responses to the PhotoIdVerifyRequest application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const photoIdVerifyRequestResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'sub_type',
      'front',
      'back',
      'country_code',
      'face_scan',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      sub_type: raw['sub_type'],
      front: raw['front'],
      back: raw['back'],
      country_code: raw['country_code'],
      face_scan: raw['face_scan'],
    };
  },
  ['sub_type', 'front'],
);

/**
 * Cast schema for mapping the PhotoIdVerifyRequest application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const photoIdVerifyRequestRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      sub_type: raw['sub_type'],
      front: raw['front'],
      back: raw['back'],
      country_code: raw['country_code'],
      face_scan: raw['face_scan'],
    };
  },
  ['sub_type', 'front'],
);
