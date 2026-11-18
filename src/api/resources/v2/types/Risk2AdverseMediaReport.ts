import * as core from '../../../../core';
import {
  Risk2AdverseMediaArticle,
  risk2AdverseMediaArticle,
  risk2AdverseMediaArticleRequest,
  risk2AdverseMediaArticleResponse,
} from './Risk2AdverseMediaArticle';
import {
  Risk2AdverseMediaReportState,
  risk2AdverseMediaReportState,
} from './Risk2AdverseMediaReportState';

export interface Risk2AdverseMediaReport {
  /** Every article the search found */
  articles: Risk2AdverseMediaArticle[];
  /** The screening outcome, or `NOT_PERFORMED` when the search couldn't run */
  state: Risk2AdverseMediaReportState;
}

export namespace Risk2AdverseMediaReport {
  export type State = Risk2AdverseMediaReportState;
  export const State = Risk2AdverseMediaReportState;
}

/**
 * Cast schema for the Risk2AdverseMediaReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2AdverseMediaReport = core.cast.identity<Risk2AdverseMediaReport>();

/**
 * Cast schema for mapping API responses to the Risk2AdverseMediaReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2AdverseMediaReportResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['articles', 'state']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      articles: Array.isArray(raw['articles'])
        ? (raw['articles'] as any[]).map((v: any) =>
            v == null ? v : risk2AdverseMediaArticleResponse.parse(v),
          )
        : (raw['articles'] as any),
      state: raw['state'],
    };
  },
  ['articles', 'state'],
);

/**
 * Cast schema for mapping the Risk2AdverseMediaReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2AdverseMediaReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      articles: Array.isArray(raw['articles'])
        ? (raw['articles'] as any[]).map((v: any) =>
            v == null ? v : risk2AdverseMediaArticleRequest.parse(v),
          )
        : (raw['articles'] as any),
      state: raw['state'],
    };
  },
  ['articles', 'state'],
);
