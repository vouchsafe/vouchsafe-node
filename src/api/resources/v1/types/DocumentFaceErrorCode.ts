import * as core from '../../../../core';

export const DocumentFaceErrorCode = {
  NoFaceOnDocument: 'NO_FACE_ON_DOCUMENT',
} as const;

export type DocumentFaceErrorCode =
  (typeof DocumentFaceErrorCode)[keyof typeof DocumentFaceErrorCode];

export const documentFaceErrorCode = core.cast.identity<DocumentFaceErrorCode>();
