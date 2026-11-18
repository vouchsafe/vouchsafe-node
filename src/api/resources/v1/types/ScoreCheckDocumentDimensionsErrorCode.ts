import * as core from '../../../../core';
import {
  ScoreCheckDocumentDimensionsErrorCodeStatus,
  scoreCheckDocumentDimensionsErrorCodeStatus,
} from './ScoreCheckDocumentDimensionsErrorCodeStatus';
import {
  DocumentDimensionsErrorCode,
  documentDimensionsErrorCode,
  documentDimensionsErrorCodeRequest,
  documentDimensionsErrorCodeResponse,
} from './DocumentDimensionsErrorCode';

export interface ScoreCheckDocumentDimensionsErrorCode {
  score?: number | null;
  status?: ScoreCheckDocumentDimensionsErrorCodeStatus;
  failed_reasons?: DocumentDimensionsErrorCode[];
}

export namespace ScoreCheckDocumentDimensionsErrorCode {
  export type Status = ScoreCheckDocumentDimensionsErrorCodeStatus;
  export const Status = ScoreCheckDocumentDimensionsErrorCodeStatus;
}

/**
 * Cast schema for the ScoreCheckDocumentDimensionsErrorCode model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const scoreCheckDocumentDimensionsErrorCode =
  core.cast.identity<ScoreCheckDocumentDimensionsErrorCode>();

/**
 * Cast schema for mapping API responses to the ScoreCheckDocumentDimensionsErrorCode application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const scoreCheckDocumentDimensionsErrorCodeResponse = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  const __declaredKeys = new Set<string>(['score', 'status', 'failed_reasons']);
  const __extras: { [key: string]: unknown } = {};
  for (const __key of globalThis.Object.keys(raw as object)) {
    if (!__declaredKeys.has(__key)) {
      __extras[__key] = (raw as { [key: string]: unknown })[__key];
    }
  }
  return {
    ...__extras,
    score: raw['score'],
    status: raw['status'],
    failed_reasons: raw['failed_reasons'],
  };
}, []);

/**
 * Cast schema for mapping the ScoreCheckDocumentDimensionsErrorCode application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const scoreCheckDocumentDimensionsErrorCodeRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return { score: raw['score'], status: raw['status'], failed_reasons: raw['failed_reasons'] };
}, []);
