import { RawResponse } from './utils/fetcher';
import { WithRawResponse } from './response-promise';

/**
 * One page of paginated results — implements `AsyncIterable<T>` so `for await` walks every item
 * across every page automatically. Matches Fern's own `core.Page<T, R>` shape exactly (see
 * `HttpClient.loadCursorPaginated`/`loadPaginated` for where one is constructed): `data`/
 * `rawResponse`/`response` are the current page's items/raw response metadata/full parsed response
 * body; `getNextPage()`/`hasNextPage()` advance and check for more. The three fetch closures below
 * are constructor-only and never part of this class's own exported public surface — supplied by
 * whichever `HttpClient` method builds a given `Page`, wired to this SDK's own request/pagination
 * machinery, not ported from Fern's.
 */
export class Page<T, R = unknown> implements AsyncIterable<T> {
  public data: T[];
  public rawResponse: RawResponse;
  public response: R;

  private _hasNextPage: (response: R) => boolean;
  private getItems: (response: R) => T[];
  private loadNextPage: (response: R) => Promise<WithRawResponse<R>>;

  constructor({
    response,
    rawResponse,
    hasNextPage,
    getItems,
    loadPage,
  }: {
    response: R;
    rawResponse: RawResponse;
    hasNextPage: (response: R) => boolean;
    getItems: (response: R) => T[];
    loadPage: (response: R) => Promise<WithRawResponse<R>>;
  }) {
    this.response = response;
    this.rawResponse = rawResponse;
    this.data = getItems(response);
    this._hasNextPage = hasNextPage;
    this.getItems = getItems;
    this.loadNextPage = loadPage;
  }

  /**
   * Fetches the next page and updates `data`/`rawResponse`/`response` in place.
   * @returns this
   */
  public async getNextPage(): Promise<this> {
    const { data, rawResponse } = await this.loadNextPage(this.response);
    this.response = data;
    this.rawResponse = rawResponse;
    this.data = this.getItems(this.response);
    return this;
  }

  /**
   * @returns whether there is a next page to load
   */
  public hasNextPage(): boolean {
    return this._hasNextPage(this.response);
  }

  private async *iterMessages(): AsyncGenerator<T, void> {
    for (const item of this.data) {
      yield item;
    }

    while (this.hasNextPage()) {
      await this.getNextPage();
      for (const item of this.data) {
        yield item;
      }
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T, void, unknown> {
    for await (const message of this.iterMessages()) {
      yield message;
    }
  }
}
