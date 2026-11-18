import { HttpResponse } from '../types';

/**
 * A single server-sent event: the decoded payload plus the frame's protocol fields.
 */
export interface ServerSentEvent<T> {
  data: T;
  id?: string;
  retry?: number;
  event?: string;
}

/**
 * Wraps a stream of decoded SSE frames so a caller can iterate plain values directly, or call
 * `withMetadata()` to iterate `ServerSentEvent<T>` instead. Both consume the same underlying
 * generator, so only one may be iterated.
 */
export class SseStream<T> implements AsyncIterable<T> {
  constructor(private readonly responses: AsyncGenerator<HttpResponse<T>>) {}

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    for await (const response of this.responses) {
      yield response.data as T;
    }
  }

  public withMetadata(): AsyncIterable<ServerSentEvent<T>> {
    const responses = this.responses;
    return {
      async *[Symbol.asyncIterator](): AsyncIterator<ServerSentEvent<T>> {
        for await (const response of responses) {
          yield {
            data: response.data as T,
            id: response.sse?.id,
            retry: response.sse?.retry,
            event: response.sse?.event,
          };
        }
      },
    };
  }
}
