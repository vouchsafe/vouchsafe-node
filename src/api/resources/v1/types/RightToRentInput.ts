import * as core from '../../../../core';
import { RightToRentInputSubType, rightToRentInputSubType } from './RightToRentInputSubType';
import {
  RightToRentInputPayload,
  rightToRentInputPayload,
  rightToRentInputPayloadRequest,
  rightToRentInputPayloadResponse,
} from './RightToRentInputPayload';
import { RightToRentInputPayloadRole } from './RightToRentInputPayloadRole';

/**
 * Request payload for RightToRent verification
 */
export interface RightToRentInput {
  /** The type of eVisa verification to perform */
  sub_type: 'RightToRent';
  payload: RightToRentInputPayload;
}

export namespace RightToRentInput {
  export type SubType = RightToRentInputSubType;
  export const SubType = RightToRentInputSubType;
  export interface Payload {
    role: RightToRentInputPayload['role'];
    company_name: RightToRentInputPayload['company_name'];
    date_of_birth: RightToRentInputPayload['date_of_birth'];
    share_code: RightToRentInputPayload['share_code'];
  }
  export namespace Payload {
    export type Role = RightToRentInputPayloadRole;
    export const Role = RightToRentInputPayloadRole;
  }
}

/**
 * Cast schema for the RightToRentInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const rightToRentInput = core.cast.identity<RightToRentInput>();

/**
 * Cast schema for mapping API responses to the RightToRentInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const rightToRentInputResponse = core.cast.object(
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
          : rightToRentInputPayloadResponse.parse(raw['payload']),
    };
  },
  ['sub_type', 'payload'],
);

/**
 * Cast schema for mapping the RightToRentInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const rightToRentInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      sub_type: raw['sub_type'],
      payload:
        raw['payload'] == null
          ? raw['payload']
          : rightToRentInputPayloadRequest.parse(raw['payload']),
    };
  },
  ['sub_type', 'payload'],
);
