import * as core from '../../../../core';
import {
  CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus,
  compoundIdentifiersCheckMrzPhotoIdFailedReasonStatus,
} from './CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus';
import {
  CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata,
  compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata,
  compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadataRequest,
  compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadataResponse,
} from './CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata';
import {
  MrzPhotoIdFailedReason,
  mrzPhotoIdFailedReason,
  mrzPhotoIdFailedReasonRequest,
  mrzPhotoIdFailedReasonResponse,
} from './MrzPhotoIdFailedReason';

export interface CompoundIdentifiersCheckMrzPhotoIdFailedReason {
  status?: CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus;
  metadata?: CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata;
  failed_reasons?: MrzPhotoIdFailedReason[];
}

export namespace CompoundIdentifiersCheckMrzPhotoIdFailedReason {
  export type Status = CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus;
  export const Status = CompoundIdentifiersCheckMrzPhotoIdFailedReasonStatus;
  export interface Metadata {
    mismatches: CompoundIdentifiersCheckMrzPhotoIdFailedReasonMetadata['mismatches'];
  }
}

/**
 * Cast schema for the CompoundIdentifiersCheckMrzPhotoIdFailedReason model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const compoundIdentifiersCheckMrzPhotoIdFailedReason =
  core.cast.identity<CompoundIdentifiersCheckMrzPhotoIdFailedReason>();

/**
 * Cast schema for mapping API responses to the CompoundIdentifiersCheckMrzPhotoIdFailedReason application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckMrzPhotoIdFailedReasonResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['status', 'metadata', 'failed_reasons']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      status: raw['status'],
      metadata:
        raw['metadata'] == null
          ? raw['metadata']
          : compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadataResponse.parse(raw['metadata']),
      failed_reasons: raw['failed_reasons'],
    };
  },
  [],
);

/**
 * Cast schema for mapping the CompoundIdentifiersCheckMrzPhotoIdFailedReason application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckMrzPhotoIdFailedReasonRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      status: raw['status'],
      metadata:
        raw['metadata'] == null
          ? raw['metadata']
          : compoundIdentifiersCheckMrzPhotoIdFailedReasonMetadataRequest.parse(raw['metadata']),
      failed_reasons: raw['failed_reasons'],
    };
  },
  [],
);
