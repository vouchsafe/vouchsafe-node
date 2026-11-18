import * as core from '../../../../core';
import {
  ImmigrationStatusApiValidationStatus,
  immigrationStatusApiValidationStatus,
} from './ImmigrationStatusApiValidationStatus';
import {
  ImmigrationStatusEvisaStartedFailedReason,
  immigrationStatusEvisaStartedFailedReason,
} from './ImmigrationStatusEvisaStartedFailedReason';

export interface ImmigrationStatusEvisaStartedResult {
  status: ImmigrationStatusApiValidationStatus;
  failed_reasons?: ImmigrationStatusEvisaStartedFailedReason[];
}

/**
 * Cast schema for the ImmigrationStatusEvisaStartedResult model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const immigrationStatusEvisaStartedResult =
  core.cast.identity<ImmigrationStatusEvisaStartedResult>();

/**
 * Cast schema for mapping API responses to the ImmigrationStatusEvisaStartedResult application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const immigrationStatusEvisaStartedResultResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['status', 'failed_reasons']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, status: raw['status'], failed_reasons: raw['failed_reasons'] };
  },
  ['status'],
);

/**
 * Cast schema for mapping the ImmigrationStatusEvisaStartedResult application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const immigrationStatusEvisaStartedResultRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { status: raw['status'], failed_reasons: raw['failed_reasons'] };
  },
  ['status'],
);
