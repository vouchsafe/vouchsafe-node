import * as core from '../../../../core';
import { FailedReason, failedReason } from './FailedReason';

export const apiErrorResponse = core.cast.identity<ApiErrorResponse>();

export interface ApiErrorResponse {
  status_code: number;
  message: string;
  error_detail?: any;
  failedReason?: FailedReason;
  error_code?: string;
  retry_after_seconds?: number;
}

export const apiErrorResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'status_code',
      'message',
      'error_detail',
      'failedReason',
      'error_code',
      'retry_after_seconds',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      status_code: raw['status_code'],
      message: raw['message'],
      error_detail: raw['error_detail'],
      failedReason: raw['failedReason'],
      error_code: raw['error_code'],
      retry_after_seconds: raw['retry_after_seconds'],
    };
  },
  ['status_code', 'message'],
);

export const apiErrorResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      status_code: raw['status_code'],
      message: raw['message'],
      error_detail: raw['error_detail'],
      failedReason: raw['failedReason'],
      error_code: raw['error_code'],
      retry_after_seconds: raw['retry_after_seconds'],
    };
  },
  ['status_code', 'message'],
);
