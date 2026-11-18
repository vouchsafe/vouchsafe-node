import * as core from '../../../../core';
import {
  AdverseMediaResponseStatus,
  adverseMediaResponseStatus,
} from './AdverseMediaResponseStatus';
import {
  AdverseMediaArticle,
  adverseMediaArticle,
  adverseMediaArticleRequest,
  adverseMediaArticleResponse,
} from './AdverseMediaArticle';

export interface AdverseMediaResponse {
  /** Whether the check passed or failed */
  status: AdverseMediaResponseStatus;
  /** The threshold used for this check */
  threshold: number;
  /** Articles that scored at or above the threshold */
  strong_matches: AdverseMediaArticle[];
  /** All articles found, including weak matches, for audit purposes */
  all_results: AdverseMediaArticle[];
}

export namespace AdverseMediaResponse {
  export type Status = AdverseMediaResponseStatus;
  export const Status = AdverseMediaResponseStatus;
}

/**
 * Cast schema for the AdverseMediaResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const adverseMediaResponse = core.cast.identity<AdverseMediaResponse>();

/**
 * Cast schema for mapping API responses to the AdverseMediaResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const adverseMediaResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'status',
      'threshold',
      'strong_matches',
      'all_results',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      status: raw['status'],
      threshold: raw['threshold'],
      strong_matches: Array.isArray(raw['strong_matches'])
        ? (raw['strong_matches'] as any[]).map((v: any) =>
            v == null ? v : adverseMediaArticleResponse.parse(v),
          )
        : (raw['strong_matches'] as any),
      all_results: Array.isArray(raw['all_results'])
        ? (raw['all_results'] as any[]).map((v: any) =>
            v == null ? v : adverseMediaArticleResponse.parse(v),
          )
        : (raw['all_results'] as any),
    };
  },
  ['status', 'threshold', 'strong_matches', 'all_results'],
);

/**
 * Cast schema for mapping the AdverseMediaResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const adverseMediaResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      status: raw['status'],
      threshold: raw['threshold'],
      strong_matches: Array.isArray(raw['strong_matches'])
        ? (raw['strong_matches'] as any[]).map((v: any) =>
            v == null ? v : adverseMediaArticleRequest.parse(v),
          )
        : (raw['strong_matches'] as any),
      all_results: Array.isArray(raw['all_results'])
        ? (raw['all_results'] as any[]).map((v: any) =>
            v == null ? v : adverseMediaArticleRequest.parse(v),
          )
        : (raw['all_results'] as any),
    };
  },
  ['status', 'threshold', 'strong_matches', 'all_results'],
);
