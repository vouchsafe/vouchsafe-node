import * as core from '../../../../core';
import {
  FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem,
  failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem,
  failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItemRequest,
  failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItemResponse,
} from './FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem';
import { FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasons } from '../../../types/FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasons';

export interface FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData {
  failed_reasons: FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem[];
}

export namespace FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData {
  export type FailedReasons = FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasons;
  export namespace FailedReasons {
    export type Item = FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataFailedReasonsItem;
  }
}

/**
 * Cast schema for the FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData =
  core.cast.identity<FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData>();

/**
 * Cast schema for mapping API responses to the FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataResponse = core.cast.object(
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
 * Cast schema for mapping the FailFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzData application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const failFailedReasonMrzNotTd1OrFailedReasonIncompleteMrzDataRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { failed_reasons: raw['failed_reasons'] };
  },
  ['failed_reasons'],
);
