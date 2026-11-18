import { HttpMetadata } from '../types';

/**
 * The result of fetching one page: the page's data, its raw response metadata, and whether
 * another page is available to fetch after this one.
 */
export interface PagerFetchResult<Page> {
  data: Page;
  rawResponse: HttpMetadata;
  hasMore: boolean;
}

/**
 * A page of paginated results that can also be advanced manually. Mirrors Fern's own `core.Page`
 * surface (`.rawResponse`, `.getNextPage()`) so a fernMode SDK matches Fern's pagination shape
 * instead of the classic generator's bare `AsyncGenerator`, which has no room for either.
 *
 * Iterating (`for await`) yields one page's data per step, same shape as the classic generator
 * yielded before it — only the wrapper around that data is new.
 *
 * Single-use: `[Symbol.asyncIterator]` advances the same `data`/`rawResponse` state a manual
 * `getNextPage()` call would. A second `for await`, two concurrent iterations, or mixing
 * `getNextPage()` with `for await` all resume/interleave from wherever the shared state is,
 * rather than restarting.
 */
export class Pager<Page> implements AsyncIterable<Page> {
  public data: Page;

  public rawResponse: HttpMetadata;

  private hasMore: boolean;

  private readonly fetchNext: () => Promise<PagerFetchResult<Page>>;

  constructor(init: PagerFetchResult<Page> & { fetchNext: () => Promise<PagerFetchResult<Page>> }) {
    this.data = init.data;
    this.rawResponse = init.rawResponse;
    this.hasMore = init.hasMore;
    this.fetchNext = init.fetchNext;
  }

  /**
   * Fetches the next page and updates `data`/`rawResponse` in place.
   * @returns this, now reflecting the newly-fetched page
   */
  public async getNextPage(): Promise<this> {
    const next = await this.fetchNext();
    this.data = next.data;
    this.rawResponse = next.rawResponse;
    this.hasMore = next.hasMore;
    return this;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<Page> {
    yield this.data;
    while (this.hasMore) {
      await this.getNextPage();
      yield this.data;
    }
  }
}
