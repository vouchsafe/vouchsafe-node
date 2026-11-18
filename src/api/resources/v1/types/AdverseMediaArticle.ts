import * as core from '../../../../core';

export interface AdverseMediaArticle {
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
  /** Score (0–100) assigned by the screening model.
Higher scores indicate more serious adverse content. */
  score: number;
}

/**
 * Cast schema for the AdverseMediaArticle model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const adverseMediaArticle = core.cast.identity<AdverseMediaArticle>();

/**
 * Cast schema for mapping API responses to the AdverseMediaArticle application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const adverseMediaArticleResponse = core.cast.object(
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
      'score',
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
      score: raw['score'],
    };
  },
  ['title', 'link', 'source', 'published_at', 'snippet', 'score'],
);

/**
 * Cast schema for mapping the AdverseMediaArticle application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const adverseMediaArticleRequest = core.cast.object(
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
      score: raw['score'],
    };
  },
  ['title', 'link', 'source', 'published_at', 'snippet', 'score'],
);
