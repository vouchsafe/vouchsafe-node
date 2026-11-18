import * as core from '../../../../core';
import {
  CompoundIdentifiersCheckPassCardFailedReasonStatus,
  compoundIdentifiersCheckPassCardFailedReasonStatus,
} from './CompoundIdentifiersCheckPassCardFailedReasonStatus';
import {
  CompoundIdentifiersCheckPassCardFailedReasonMetadata,
  compoundIdentifiersCheckPassCardFailedReasonMetadata,
  compoundIdentifiersCheckPassCardFailedReasonMetadataRequest,
  compoundIdentifiersCheckPassCardFailedReasonMetadataResponse,
} from './CompoundIdentifiersCheckPassCardFailedReasonMetadata';
import {
  PassCardFailedReason,
  passCardFailedReason,
  passCardFailedReasonRequest,
  passCardFailedReasonResponse,
} from './PassCardFailedReason';

export interface CompoundIdentifiersCheckPassCardFailedReason {
  status?: CompoundIdentifiersCheckPassCardFailedReasonStatus;
  metadata?: CompoundIdentifiersCheckPassCardFailedReasonMetadata;
  failed_reasons?: PassCardFailedReason[];
}

export namespace CompoundIdentifiersCheckPassCardFailedReason {
  export type Status = CompoundIdentifiersCheckPassCardFailedReasonStatus;
  export const Status = CompoundIdentifiersCheckPassCardFailedReasonStatus;
  export interface Metadata {
    mismatches: CompoundIdentifiersCheckPassCardFailedReasonMetadata['mismatches'];
  }
}

/**
 * Cast schema for the CompoundIdentifiersCheckPassCardFailedReason model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const compoundIdentifiersCheckPassCardFailedReason =
  core.cast.identity<CompoundIdentifiersCheckPassCardFailedReason>();

/**
 * Cast schema for mapping API responses to the CompoundIdentifiersCheckPassCardFailedReason application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckPassCardFailedReasonResponse = core.cast.object(
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
          : compoundIdentifiersCheckPassCardFailedReasonMetadataResponse.parse(raw['metadata']),
      failed_reasons: raw['failed_reasons'],
    };
  },
  [],
);

/**
 * Cast schema for mapping the CompoundIdentifiersCheckPassCardFailedReason application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const compoundIdentifiersCheckPassCardFailedReasonRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      status: raw['status'],
      metadata:
        raw['metadata'] == null
          ? raw['metadata']
          : compoundIdentifiersCheckPassCardFailedReasonMetadataRequest.parse(raw['metadata']),
      failed_reasons: raw['failed_reasons'],
    };
  },
  [],
);
