import * as core from '../../../../core';
import {
  AdverseMediaRiskReportState,
  adverseMediaRiskReportState,
  adverseMediaRiskReportStateRequest,
  adverseMediaRiskReportStateResponse,
} from './AdverseMediaRiskReportState';
import {
  AdverseMediaRiskArticle,
  adverseMediaRiskArticle,
  adverseMediaRiskArticleRequest,
  adverseMediaRiskArticleResponse,
} from './AdverseMediaRiskArticle';

export interface AdverseMediaRiskReport {
  /** The screening outcome, or `NOT_PERFORMED` when the search couldn't run */
  state: AdverseMediaRiskReportState;
  /** Every article the search found */
  articles: AdverseMediaRiskArticle[];
}

export namespace AdverseMediaRiskReport {
  export type State = AdverseMediaRiskReportState;
}

/**
 * Cast schema for the AdverseMediaRiskReport model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const adverseMediaRiskReport = core.cast.identity<AdverseMediaRiskReport>();

/**
 * Cast schema for mapping API responses to the AdverseMediaRiskReport application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const adverseMediaRiskReportResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>(['state', 'articles']);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      state: raw['state'],
      articles: Array.isArray(raw['articles'])
        ? (raw['articles'] as any[]).map((v: any) =>
            v == null ? v : adverseMediaRiskArticleResponse.parse(v),
          )
        : (raw['articles'] as any),
    };
  },
  ['state', 'articles'],
);

/**
 * Cast schema for mapping the AdverseMediaRiskReport application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const adverseMediaRiskReportRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      state: raw['state'],
      articles: Array.isArray(raw['articles'])
        ? (raw['articles'] as any[]).map((v: any) =>
            v == null ? v : adverseMediaRiskArticleRequest.parse(v),
          )
        : (raw['articles'] as any),
    };
  },
  ['state', 'articles'],
);
