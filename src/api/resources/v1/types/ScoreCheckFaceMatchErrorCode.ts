import * as core from '../../../../core';
import {
  ScoreCheckFaceMatchErrorCodeStatus,
  scoreCheckFaceMatchErrorCodeStatus,
} from './ScoreCheckFaceMatchErrorCodeStatus';
import {
  FaceMatchErrorCode,
  faceMatchErrorCode,
  faceMatchErrorCodeRequest,
  faceMatchErrorCodeResponse,
} from './FaceMatchErrorCode';

export interface ScoreCheckFaceMatchErrorCode {
  score?: number | null;
  status?: ScoreCheckFaceMatchErrorCodeStatus;
  failed_reasons?: FaceMatchErrorCode[];
}

export namespace ScoreCheckFaceMatchErrorCode {
  export type Status = ScoreCheckFaceMatchErrorCodeStatus;
  export const Status = ScoreCheckFaceMatchErrorCodeStatus;
}

/**
 * Cast schema for the ScoreCheckFaceMatchErrorCode model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const scoreCheckFaceMatchErrorCode = core.cast.identity<ScoreCheckFaceMatchErrorCode>();

/**
 * Cast schema for mapping API responses to the ScoreCheckFaceMatchErrorCode application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const scoreCheckFaceMatchErrorCodeResponse = core.cast.object((raw: any): any => {
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
 * Cast schema for mapping the ScoreCheckFaceMatchErrorCode application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const scoreCheckFaceMatchErrorCodeRequest = core.cast.object((raw: any): any => {
  if (raw === null || raw === undefined) {
    return raw;
  }
  return { score: raw['score'], status: raw['status'], failed_reasons: raw['failed_reasons'] };
}, []);
