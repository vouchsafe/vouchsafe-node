import * as core from '../../../../core';

/**
 * Response returned by `GET /artefacts/{artefact_key}`
 */
export interface GetArtefactsResponse {
  /** The requested artefact key */
  artefact_key: string;
  /** Time-limited pre-signed URL to download the file */
  download_url: string;
  /** Expiry time of the download URL (ISO 8601 UTC) */
  expires_at: string;
  /** Number of seconds until the download URL expires */
  expires_in_seconds: number;
}

/**
 * Cast schema for the GetArtefactsResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const getArtefactsResponse = core.cast.identity<GetArtefactsResponse>();

/**
 * Cast schema for mapping API responses to the GetArtefactsResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const getArtefactsResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'artefact_key',
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
      artefact_key: raw['artefact_key'],
      download_url: raw['download_url'],
      expires_at: raw['expires_at'],
      expires_in_seconds: raw['expires_in_seconds'],
    };
  },
  ['artefact_key', 'download_url', 'expires_at', 'expires_in_seconds'],
);

/**
 * Cast schema for mapping the GetArtefactsResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const getArtefactsResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      artefact_key: raw['artefact_key'],
      download_url: raw['download_url'],
      expires_at: raw['expires_at'],
      expires_in_seconds: raw['expires_in_seconds'],
    };
  },
  ['artefact_key', 'download_url', 'expires_at', 'expires_in_seconds'],
);
