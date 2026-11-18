import * as core from '../../../../core';
import {
  FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem,
  failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem,
  failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItemRequest,
  failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItemResponse,
} from './FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem';
import { FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasons } from '../../../types/FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasons';

export interface FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData {
  failed_reasons: FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem[];
}

export namespace FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData {
  export type FailedReasons = FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasons;
  export namespace FailedReasons {
    export type Item = FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataFailedReasonsItem;
  }
}

/**
 * Cast schema for the FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData =
  core.cast.identity<FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData>();

/**
 * Cast schema for mapping API responses to the FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['failed_reasons']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);

/**
 * Cast schema for mapping the FailFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzData application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const failFailedReasonMrzNotTd3OrFailedReasonIncompleteMrzDataRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);
