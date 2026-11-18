import * as core from '../../../../core';

export const DocumentCompleteAndLegibleFailedReason = {
  OriginalDocInconclusive: 'ORIGINAL_DOC_INCONCLUSIVE',
  OriginalDocNotDetected: 'ORIGINAL_DOC_NOT_DETECTED',
} as const;

export type DocumentCompleteAndLegibleFailedReason =
  (typeof DocumentCompleteAndLegibleFailedReason)[keyof typeof DocumentCompleteAndLegibleFailedReason];

export const documentCompleteAndLegibleFailedReason =
  core.cast.identity<DocumentCompleteAndLegibleFailedReason>();
