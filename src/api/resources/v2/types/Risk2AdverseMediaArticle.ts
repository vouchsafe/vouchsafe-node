import * as core from '../../../../core';
import {
  Risk2AdverseMediaArticleLevel,
  risk2AdverseMediaArticleLevel,
} from './Risk2AdverseMediaArticleLevel';

export interface Risk2AdverseMediaArticle {
  /** Why the article was given its level */
  reason: string;
  /** `FAIL` when the article accuses the person of wrongdoing that signals fraud, `REVIEW` when a person needs to check it, otherwise `PASS` */
  level: Risk2AdverseMediaArticleLevel;
  /** Short excerpt from the article */
  snippet: string;
  /** Publication date as an ISO 8601 timestamp, or null if the date could not be determined */
  published_at: string | null;
  /** Name of the publication */
  source: string;
  /** URL to the original article */
  link: string;
  /** Headline of the news article */
  title: string;
}

export namespace Risk2AdverseMediaArticle {
  export type Level = Risk2AdverseMediaArticleLevel;
  export const Level = Risk2AdverseMediaArticleLevel;
}

/**
 * Cast schema for the Risk2AdverseMediaArticle model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const risk2AdverseMediaArticle = core.cast.identity<Risk2AdverseMediaArticle>();

/**
 * Cast schema for mapping API responses to the Risk2AdverseMediaArticle application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const risk2AdverseMediaArticleResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'reason',
      'level',
      'snippet',
      'published_at',
      'source',
      'link',
      'title',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      reason: raw['reason'],
      level: raw['level'],
      snippet: raw['snippet'],
      published_at: raw['published_at'],
      source: raw['source'],
      link: raw['link'],
      title: raw['title'],
    };
  },
  ['reason', 'level', 'snippet', 'published_at', 'source', 'link', 'title'],
);

/**
 * Cast schema for mapping the Risk2AdverseMediaArticle application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const risk2AdverseMediaArticleRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      reason: raw['reason'],
      level: raw['level'],
      snippet: raw['snippet'],
      published_at: raw['published_at'],
      source: raw['source'],
      link: raw['link'],
      title: raw['title'],
    };
  },
  ['reason', 'level', 'snippet', 'published_at', 'source', 'link', 'title'],
);
