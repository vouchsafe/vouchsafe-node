import * as core from '../../../../core';

/**
 * The core feature of Vouchsafe is the verification flow.

It is a customisable set of steps that:

- collects and validates evidence from your end user
- runs background checks on that evidence and returns a result

You can make as many verification flows as you like for different business purposes.
 */
export interface Flow {
  /** The ID of the flow, useful when requesting verifications */
  id: string;
  /** The human-readable name of the flow */
  name: string;
  /** When the flow was last modified, formatted as an ISO 8601 string */
  updated_at: string;
  /** When the flow was created, formatted as an ISO 8601 string */
  created_at: string;
  /** When the flow was archived, formatted as an ISO 8601 string. Defaults to null if the flow is active */
  archived_at: string | null;
  /** How many tokens the flow uses per completed verification. [What are tokens?](https://help.vouchsafe.id/en/articles/11075413-what-are-tokens) */
  tokens_per_verification: number;
}

/**
 * Cast schema for the Flow model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const flow = core.cast.identity<Flow>();

/**
 * Cast schema for mapping API responses to the Flow application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const flowResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'name',
      'updated_at',
      'created_at',
      'archived_at',
      'tokens_per_verification',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      id: raw['id'],
      name: raw['name'],
      updated_at: raw['updated_at'],
      created_at: raw['created_at'],
      archived_at: raw['archived_at'],
      tokens_per_verification: raw['tokens_per_verification'],
    };
  },
  ['id', 'name', 'updated_at', 'created_at', 'archived_at', 'tokens_per_verification'],
);

/**
 * Cast schema for mapping the Flow application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const flowRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      name: raw['name'],
      updated_at: raw['updated_at'],
      created_at: raw['created_at'],
      archived_at: raw['archived_at'],
      tokens_per_verification: raw['tokens_per_verification'],
    };
  },
  ['id', 'name', 'updated_at', 'created_at', 'archived_at', 'tokens_per_verification'],
);
