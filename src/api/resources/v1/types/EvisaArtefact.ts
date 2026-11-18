import * as core from '../../../../core';
import { ArtefactRoleType, artefactRoleType } from './ArtefactRoleType';

/**
 * Artefact returned inline in the eVisa verification response.
Download URLs are pre-signed and expire after 30 minutes.
 */
export interface EvisaArtefact {
  role: ArtefactRoleType;
  /** Pre-signed download URL. Expires after `expires_in_seconds`. */
  download_url: string;
  /** ISO 8601 timestamp when the download URL expires. */
  expires_at: string;
  /** Time in seconds until the download URL expires (1800 seconds / 30 minutes). */
  expires_in_seconds: number;
}

/**
 * Cast schema for the EvisaArtefact model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const evisaArtefact = core.cast.identity<EvisaArtefact>();

/**
 * Cast schema for mapping API responses to the EvisaArtefact application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const evisaArtefactResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'role',
      'download_url',
      'expires_at',
      'expires_in_seconds',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      role: raw['role'],
      download_url: raw['download_url'],
      expires_at: raw['expires_at'],
      expires_in_seconds: raw['expires_in_seconds'],
    };
  },
  ['role', 'download_url', 'expires_at', 'expires_in_seconds'],
);

/**
 * Cast schema for mapping the EvisaArtefact application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const evisaArtefactRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      role: raw['role'],
      download_url: raw['download_url'],
      expires_at: raw['expires_at'],
      expires_in_seconds: raw['expires_in_seconds'],
    };
  },
  ['role', 'download_url', 'expires_at', 'expires_in_seconds'],
);
