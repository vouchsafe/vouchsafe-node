import * as core from '../../../../core';
import {
  ImmigrationStatusInputSubType,
  immigrationStatusInputSubType,
} from './ImmigrationStatusInputSubType';
import {
  ImmigrationStatusInputPayload,
  immigrationStatusInputPayload,
  immigrationStatusInputPayloadRequest,
  immigrationStatusInputPayloadResponse,
} from './ImmigrationStatusInputPayload';

/**
 * Request payload for ImmigrationStatus verification
 */
export interface ImmigrationStatusInput {
  /** The type of eVisa verification to perform */
  sub_type: 'ImmigrationStatus';
  payload: ImmigrationStatusInputPayload;
}

export namespace ImmigrationStatusInput {
  export type SubType = ImmigrationStatusInputSubType;
  export const SubType = ImmigrationStatusInputSubType;
  export interface Payload {
    reason: ImmigrationStatusInputPayload['reason'];
    job_title: ImmigrationStatusInputPayload['job_title'];
    company_name: ImmigrationStatusInputPayload['company_name'];
    date_of_birth: ImmigrationStatusInputPayload['date_of_birth'];
    share_code: ImmigrationStatusInputPayload['share_code'];
  }
}

/**
 * Cast schema for the ImmigrationStatusInput model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const immigrationStatusInput = core.cast.identity<ImmigrationStatusInput>();

/**
 * Cast schema for mapping API responses to the ImmigrationStatusInput application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const immigrationStatusInputResponse = core.cast.object(
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
          : immigrationStatusInputPayloadResponse.parse(raw['payload']),
    };
  },
  ['sub_type', 'payload'],
);

/**
 * Cast schema for mapping the ImmigrationStatusInput application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const immigrationStatusInputRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      sub_type: raw['sub_type'],
      payload:
        raw['payload'] == null
          ? raw['payload']
          : immigrationStatusInputPayloadRequest.parse(raw['payload']),
    };
  },
  ['sub_type', 'payload'],
);
