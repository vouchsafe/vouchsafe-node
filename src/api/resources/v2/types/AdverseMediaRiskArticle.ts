import * as core from '../../../../core';
import { AdverseMediaOutcome, adverseMediaOutcome } from './AdverseMediaOutcome';

export interface AdverseMediaRiskArticle {
  /** Headline of the news article */
  title: string;
  /** URL to the original article */
  link: string;
  /** Name of the publication */
  source: string;
  /** Publication date as an ISO 8601 timestamp, or null if the date could not be determined */
  published_at: string | null;
  /** Short excerpt from the article */
  snippet: string;
  level: AdverseMediaOutcome;
  /** Why the article was given its level */
  reason: string;
}

/**
 * Cast schema for the AdverseMediaRiskArticle model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const adverseMediaRiskArticle = core.cast.identity<AdverseMediaRiskArticle>();

/**
 * Cast schema for mapping API responses to the AdverseMediaRiskArticle application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const adverseMediaRiskArticleResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'title',
      'link',
      'source',
      'published_at',
      'snippet',
      'level',
      'reason',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      title: raw['title'],
      link: raw['link'],
      source: raw['source'],
      published_at: raw['published_at'],
      snippet: raw['snippet'],
      level: raw['level'],
      reason: raw['reason'],
    };
  },
  ['title', 'link', 'source', 'published_at', 'snippet', 'level', 'reason'],
);

/**
 * Cast schema for mapping the AdverseMediaRiskArticle application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const adverseMediaRiskArticleRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      title: raw['title'],
      link: raw['link'],
      source: raw['source'],
      published_at: raw['published_at'],
      snippet: raw['snippet'],
      level: raw['level'],
      reason: raw['reason'],
    };
  },
  ['title', 'link', 'source', 'published_at', 'snippet', 'level', 'reason'],
);
