import * as core from '../../../../core';

export interface OfaCheckApiDetailsSignals {
  /** Signals that contributed negatively to the footprint score. */
  negative: string[];
  /** Signals that contributed positively to the footprint score. */
  positive: string[];
}

/**
 * Cast schema for the OfaCheckApiDetailsSignals model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const ofaCheckApiDetailsSignals = core.cast.identity<OfaCheckApiDetailsSignals>();

/**
 * Cast schema for mapping API responses to the OfaCheckApiDetailsSignals application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const ofaCheckApiDetailsSignalsResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['negative', 'positive']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return { ...__extras, negative: raw['negative'], positive: raw['positive'] };
  },
  ['negative', 'positive'],
);

/**
 * Cast schema for mapping the OfaCheckApiDetailsSignals application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const ofaCheckApiDetailsSignalsRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return { negative: raw['negative'], positive: raw['positive'] };
  },
  ['negative', 'positive'],
);
