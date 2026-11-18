import * as core from '../../../../core';
import { ArtefactApiRole, artefactApiRole } from './ArtefactApiRole';

export interface ArtefactApi {
  role: ArtefactApiRole;
  key: string;
  /** The file's media type, for artefacts uploaded as a document. */
  mime_type?: string;
}

export namespace ArtefactApi {
  export type Role = ArtefactApiRole;
  export const Role = ArtefactApiRole;
}

/**
 * Cast schema for the ArtefactApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const artefactApi = core.cast.identity<ArtefactApi>();

/**
 * Cast schema for mapping API responses to the ArtefactApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const artefactApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['role', 'key', 'mime_type']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, role: raw['role'], key: raw['key'], mime_type: raw['mime_type'] };
  },
  ['role', 'key'],
);

/**
 * Cast schema for mapping the ArtefactApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const artefactApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { role: raw['role'], key: raw['key'], mime_type: raw['mime_type'] };
  },
  ['role', 'key'],
);
