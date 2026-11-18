import * as core from '../../../../core';

export interface DatasetReference {
  id: string;
  title: string;
}

/**
 * Cast schema for the DatasetReference model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const datasetReference = core.cast.identity<DatasetReference>();

/**
 * Cast schema for mapping API responses to the DatasetReference application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const datasetReferenceResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['id', 'title']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, id: raw['id'], title: raw['title'] };
  },
  ['id', 'title'],
);

/**
 * Cast schema for mapping the DatasetReference application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const datasetReferenceRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { id: raw['id'], title: raw['title'] };
  },
  ['id', 'title'],
);
