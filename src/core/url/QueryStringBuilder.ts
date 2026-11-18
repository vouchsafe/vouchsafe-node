import { toQueryString } from './qs';

/**
 * Creates a fluent builder for constructing URL query strings. Each `.add()` call serializes its
 * value immediately, so no format tracking is needed.
 *
 *     const qs = url.queryBuilder()
 *       .add('limit', limit)
 *       .add('tags', tags, { style: 'comma' })
 *       .mergeAdditional(requestOptions?.queryParams)
 *       .build();
 */
export function queryBuilder(): QueryStringBuilder {
  return new QueryStringBuilder();
}

class QueryStringBuilder {
  private parts: Map<string, string> = new Map();

  /**
   * Adds a query parameter, serializing it immediately. Arrays use the "repeat" format
   * (`key=a&key=b`) unless `{ style: 'comma' }` is passed (`key=a,b,c`). Null and undefined values
   * are skipped.
   */
  add(key: string, value: unknown, options?: { style?: 'comma' }): this {
    if (value === undefined || value === null) {
      return this;
    }
    const serialized = toQueryString(
      { [key]: value },
      { arrayFormat: options?.style === 'comma' ? 'comma' : 'repeat' },
    );
    if (serialized.length > 0) {
      this.parts.set(key, serialized);
    }
    return this;
  }

  /** Adds several parameters from a record, using the default "repeat" array format. */
  addMany(params: Record<string, unknown>): this {
    if (params != null) {
      for (const [key, value] of Object.entries(params)) {
        this.add(key, value);
      }
    }
    return this;
  }

  /** Merges parameters supplied at call time (`requestOptions.queryParams`); last write wins. */
  mergeAdditional(additionalParams?: Record<string, unknown>): this {
    if (additionalParams != null) {
      for (const [key, value] of Object.entries(additionalParams)) {
        if (value === undefined || value === null) {
          continue;
        }
        const serialized = toQueryString({ [key]: value }, { arrayFormat: 'repeat' });
        if (serialized.length > 0) {
          this.parts.set(key, serialized);
        }
      }
    }
    return this;
  }

  /** Returns the assembled query string without the leading `?`, or '' when nothing was added. */
  build(): string {
    return [...this.parts.values()].join('&');
  }
}
