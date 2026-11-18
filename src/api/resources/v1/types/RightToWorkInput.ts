import * as core from '../../../../core';
import { RightToWorkInputSubType, rightToWorkInputSubType } from './RightToWorkInputSubType';
import {
  RightToWorkInputPayload,
  rightToWorkInputPayload,
  rightToWorkInputPayloadRequest,
  rightToWorkInputPayloadResponse,
} from './RightToWorkInputPayload';

/**
 * Request payload for RightToWork verification
 */
export interface RightToWorkInput {
  /** The type of eVisa verification to perform */
  sub_type: 'RightToWork';
  payload: RightToWorkInputPayload;
}

export namespace RightToWorkInput {
  export type SubType = RightToWorkInputSubType;
  export const SubType = RightToWorkInputSubType;
  export interface Payload {
    company_name: RightToWorkInputPayload['company_name'];
    date_of_birth: RightToWorkInputPayload['date_of_birth'];
    share_code: RightToWorkInputPayload['share_code'];
  }
}

/**
 * Cast schema for the RightToWorkInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToWorkInput = core.cast.identity<RightToWorkInput>();

/**
 * Cast schema for mapping API responses to the RightToWorkInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToWorkInputResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['sub_type', 'payload']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      sub_type: raw['sub_type'],
      payload:
        raw['payload'] == null
          ? raw['payload']
          : rightToWorkInputPayloadResponse.parse(raw['payload']),
    };
  },
  ['sub_type', 'payload'],
);

/**
 * Cast schema for mapping the RightToWorkInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToWorkInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      sub_type: raw['sub_type'],
      payload:
        raw['payload'] == null
          ? raw['payload']
          : rightToWorkInputPayloadRequest.parse(raw['payload']),
    };
  },
  ['sub_type', 'payload'],
);
