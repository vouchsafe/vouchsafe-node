import { BinaryResponse } from './types';
import { RawResponse } from './utils/fetcher';

/**
 * The parsed body plus the raw fetch `Response` metadata, returned by
 * {@link HttpResponsePromise.withRawResponse}. Matches Fern's own `RawResponse` shape exactly
 * (see fetcher.ejs) rather than the narrower `HttpMetadata` used elsewhere in this SDK's own
 * request/response types — `WithRawResponse` is a Fern-drop-in-parity surface, not this SDK's
 * native shape.
 */
export interface WithRawResponse<T> {
  readonly data: T;
  readonly rawResponse: RawResponse;
}

/**
 * Wraps a live `fetch` `Response` into a {@link BinaryResponse}, mirroring Fern's own
 * `core/fetcher/BinaryResponse.ts` factory. Must be called before the response body is otherwise
 * consumed (e.g. via `.clone().arrayBuffer()`).
 */
export function getBinaryResponse(response: Response): BinaryResponse {
  const binaryResponse: BinaryResponse = {
    get bodyUsed() {
      return response.bodyUsed;
    },
    stream: () => response.body,
    arrayBuffer: response.arrayBuffer.bind(response),
    blob: response.blob.bind(response),
  };
  if ('bytes' in response && typeof response.bytes === 'function') {
    binaryResponse.bytes = response.bytes.bind(response);
  }
  return binaryResponse;
}

/**
 * A `Promise<T>` that also exposes {@link withRawResponse} to retrieve the response's status and
 * headers alongside the parsed body. Awaiting an instance directly (or passing it to
 * `Promise.all`/`Promise.race`) resolves to the body, same as a plain `Promise<T>`.
 *
 * Two caveats inherited from this shape, both accepted rather than worked around:
 * - Inherited statics (`HttpResponsePromise.resolve(...)`) do not work — the constructor is
 *   private, and `private` is a compile-time-only restriction.
 * - `console.log(instance)` prints an already-resolved promise, not `Promise { <pending> }` — the
 *   underlying request is still in flight until `innerPromise` settles.
 */
export class HttpResponsePromise<T> extends Promise<T> {
  private innerPromise: Promise<WithRawResponse<T>>;
  private unwrappedPromise: Promise<T> | undefined;

  private constructor(promise: Promise<WithRawResponse<T>>) {
    // Neutralize the base Promise constructor so it doesn't parse anything itself; all real work
    // happens through innerPromise via the overrides below.
    super((resolve) => {
      resolve(undefined as unknown as T);
    });
    this.innerPromise = promise;
  }

  public static fromPromise<T>(promise: Promise<WithRawResponse<T>>): HttpResponsePromise<T> {
    return new HttpResponsePromise<T>(promise);
  }

  /** Creates an `HttpResponsePromise` from a function that returns a promise. */
  public static fromFunction<F extends (...args: never[]) => Promise<WithRawResponse<T>>, T>(
    fn: F,
    ...args: Parameters<F>
  ): HttpResponsePromise<T> {
    return new HttpResponsePromise<T>(fn(...args));
  }

  /** Creates a function that returns an `HttpResponsePromise` from a function that returns a promise. */
  public static interceptFunction<
    F extends (...args: never[]) => Promise<WithRawResponse<T>>,
    T = Awaited<ReturnType<F>>['data'],
  >(fn: F): (...args: Parameters<F>) => HttpResponsePromise<T> {
    return (...args: Parameters<F>): HttpResponsePromise<T> => {
      return HttpResponsePromise.fromPromise<T>(fn(...args));
    };
  }

  /** Creates an `HttpResponsePromise` from an executor function. */
  public static fromExecutor<T>(
    executor: (
      resolve: (value: WithRawResponse<T>) => void,
      reject: (reason?: unknown) => void,
    ) => void,
  ): HttpResponsePromise<T> {
    const promise = new Promise<WithRawResponse<T>>(executor);
    return new HttpResponsePromise<T>(promise);
  }

  /** Creates an `HttpResponsePromise` from an already-resolved result. */
  public static fromResult<T>(result: WithRawResponse<T>): HttpResponsePromise<T> {
    const promise = Promise.resolve(result);
    return new HttpResponsePromise<T>(promise);
  }

  private unwrap(): Promise<T> {
    if (!this.unwrappedPromise) {
      this.unwrappedPromise = this.innerPromise.then(({ data }) => data);
    }
    return this.unwrappedPromise;
  }

  public override then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.unwrap().then(onfulfilled, onrejected);
  }

  public override catch<TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult> {
    return this.unwrap().catch(onrejected);
  }

  public override finally(onfinally?: (() => void) | null): Promise<T> {
    return this.unwrap().finally(onfinally);
  }

  public async withRawResponse(): Promise<WithRawResponse<T>> {
    return await this.innerPromise;
  }
}
