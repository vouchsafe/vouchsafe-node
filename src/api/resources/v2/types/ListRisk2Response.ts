import * as core from '../../../../core';
import { ListRisk2ResponseObject, listRisk2ResponseObject } from './ListRisk2ResponseObject';
import {
  GetRisk2Response,
  getRisk2Response,
  getRisk2ResponseRequest,
  getRisk2ResponseResponse,
} from './GetRisk2Response';

export interface ListRisk2Response {
  object: ListRisk2ResponseObject;
  /** Risk checks, newest first. */
  data: GetRisk2Response[];
  /** Whether more checks follow. Pass the last check's `id` as `starting_after` to fetch them. */
  has_more: boolean;
}

export namespace ListRisk2Response {
  export type Object_ = ListRisk2ResponseObject;
  export const Object_ = ListRisk2ResponseObject;
}

/**
 * Cast schema for the ListRisk2Response model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const listRisk2Response = core.cast.identity<ListRisk2Response>();

/**
 * Cast schema for mapping API responses to the ListRisk2Response application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const listRisk2ResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['object', 'data', 'has_more']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      object: raw['object'],
      data: Array.isArray(raw['data'])
        ? (raw['data'] as any[]).map((v: any) =>
            v == null ? v : getRisk2ResponseResponse.parse(v),
          )
        : (raw['data'] as any),
      has_more: raw['has_more'],
    };
  },
  ['object', 'data', 'has_more'],
);

/**
 * Cast schema for mapping the ListRisk2Response application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const listRisk2ResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      object: raw['object'],
      data: Array.isArray(raw['data'])
        ? (raw['data'] as any[]).map((v: any) => (v == null ? v : getRisk2ResponseRequest.parse(v)))
        : (raw['data'] as any),
      has_more: raw['has_more'],
    };
  },
  ['object', 'data', 'has_more'],
);
