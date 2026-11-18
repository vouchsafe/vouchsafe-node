import { Request } from '../transport/request';
import { ResponseDefinition } from '../transport/types';
import { ContentType, HttpResponse, RequestHandler, SseEventFields } from '../types';
import { ResponseMatcher } from '../utils/response-matcher';
import { VouchsafeApiError } from '../errors/throwable-error';
import * as core from '../../core';

/**
 * Request handler that validates and decodes HTTP response bodies.
 * Supports multiple content types including JSON, XML, binary, form data, and event streams.
 */
export class ResponseValidationHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request and validates its response.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the validated HTTP response
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    const response = await this.next!.handle<T>(request);

    return this.decodeBody<T>(request, response);
  }

  /**
   * Handles a streaming HTTP request and validates response chunks.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields validated HTTP responses
   * @throws Error if response headers are enabled (streaming not supported with headers)
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    const stream = this.next!.stream<T>(request);
    const eventShape = request.eventShape;

    if (eventShape?.type === 'json') {
      yield* this.streamJsonMessages<T>(request, stream, eventShape.messageTerminator);
      return;
    }

    yield* this.streamEventFrames<T>(
      request,
      stream,
      eventShape?.streamTerminator,
      eventShape?.type === 'sse' ? eventShape.eventDiscriminator : undefined,
    );
  }

  private async *streamEventFrames<T>(
    request: Request,
    stream: AsyncGenerator<HttpResponse<T>>,
    streamTerminator: string | undefined,
    eventDiscriminator: string | undefined,
  ): AsyncGenerator<HttpResponse<T>> {
    const decoder = new TextDecoder();
    let dataLines: string[] = [];
    let pendingLine = '';
    let lastEventStreamResponse: HttpResponse<T> | undefined;
    let eventName: string | undefined;
    let eventId: string | undefined;
    let eventRetry: number | undefined;

    for await (const response of stream) {
      if (!this.isEventStreamResponse(response)) {
        if (this.hasBlankBody(response)) {
          continue;
        }
        const trailingData = this.parseTrailingDataLine(pendingLine);
        pendingLine = '';
        if (trailingData !== undefined) {
          dataLines.push(trailingData);
        }
        if (lastEventStreamResponse && dataLines.length > 0) {
          const pending = dataLines.join('\n');
          const fields: SseEventFields = { event: eventName, id: eventId, retry: eventRetry };
          dataLines = [];
          if (this.isStreamTerminator(pending, streamTerminator)) {
            return;
          }
          yield this.decodeStreamPayload<T>(
            request,
            lastEventStreamResponse,
            pending,
            fields,
            eventDiscriminator,
          );
        }
        eventName = undefined;
        yield this.decodeBody<T>(request, response);
        continue;
      }
      lastEventStreamResponse = response;

      const buffered = pendingLine + decoder.decode(response.raw, { stream: true });
      const lines = buffered.split('\n');
      pendingLine = lines.pop() ?? '';

      for (const rawLine of lines) {
        const line = rawLine.replace(/\r$/, '');

        if (line.trim().length === 0) {
          const frame = dataLines;
          const fields: SseEventFields = { event: eventName, id: eventId, retry: eventRetry };
          dataLines = [];
          eventName = undefined;
          if (frame.length === 0) {
            continue;
          }
          const dataValue = frame.join('\n');
          if (this.isStreamTerminator(dataValue, streamTerminator)) {
            return;
          }
          yield this.decodeStreamPayload<T>(
            request,
            response,
            dataValue,
            fields,
            eventDiscriminator,
          );
          continue;
        }

        if (line.startsWith(':')) {
          continue;
        }
        if (line.startsWith('data:')) {
          dataLines.push(this.parseDataValue(line));
          continue;
        }
        if (line.startsWith('event:')) {
          eventName = line.slice('event:'.length).trim();
          continue;
        }
        if (line.startsWith('id:')) {
          const idValue = line.slice('id:'.length).trim();
          if (!idValue.includes('\0')) {
            eventId = idValue;
          }
          continue;
        }
        if (line.startsWith('retry:')) {
          const retryValue = line.slice('retry:'.length).trim();
          const parsed = parseInt(retryValue, 10);
          if (!Number.isNaN(parsed) && String(parsed) === retryValue) {
            eventRetry = parsed;
          }
        }
      }
    }

    const trailingData = this.parseTrailingDataLine(pendingLine);
    if (trailingData !== undefined) {
      dataLines.push(trailingData);
    }

    if (lastEventStreamResponse && dataLines.length > 0) {
      const dataValue = dataLines.join('\n');
      if (!this.isStreamTerminator(dataValue, streamTerminator)) {
        yield this.decodeStreamPayload<T>(
          request,
          lastEventStreamResponse,
          dataValue,
          { event: eventName, id: eventId, retry: eventRetry },
          eventDiscriminator,
        );
      }
    }
  }

  private isStreamTerminator(dataValue: string, streamTerminator: string | undefined): boolean {
    return streamTerminator !== undefined && dataValue.trim() === streamTerminator;
  }

  private async *streamJsonMessages<T>(
    request: Request,
    stream: AsyncGenerator<HttpResponse<T>>,
    messageTerminator: string,
  ): AsyncGenerator<HttpResponse<T>> {
    const decoder = new TextDecoder();
    let buffered = '';
    let lastResponse: HttpResponse<T> | undefined;
    let eventId: string | undefined;
    let eventRetry: number | undefined;

    // A json-framed stream may still carry SSE-style `id:`/`retry:`/comment lines interleaved
    // with whole-JSON-message lines; those are metadata, not payload, and must not be parsed as JSON.
    const consumeMetadataLine = (message: string): boolean => {
      if (message.startsWith(':')) {
        return true;
      }
      if (message.startsWith('id:')) {
        const idValue = message.slice('id:'.length).trim();
        if (!idValue.includes('\0')) {
          eventId = idValue;
        }
        return true;
      }
      if (message.startsWith('retry:')) {
        const retryValue = message.slice('retry:'.length).trim();
        const parsed = parseInt(retryValue, 10);
        if (!Number.isNaN(parsed) && String(parsed) === retryValue) {
          eventRetry = parsed;
        }
        return true;
      }
      return false;
    };

    for await (const response of stream) {
      lastResponse = response;
      buffered += decoder.decode(response.raw, { stream: true });

      let terminatorIndex: number;
      while ((terminatorIndex = buffered.indexOf(messageTerminator)) >= 0) {
        const message = buffered.slice(0, terminatorIndex);
        buffered = buffered.slice(terminatorIndex + messageTerminator.length);

        if (message.trim().length === 0 || consumeMetadataLine(message)) {
          continue;
        }
        yield this.decodeStreamPayload<T>(request, response, message, {
          id: eventId,
          retry: eventRetry,
        });
      }
    }

    if (
      lastResponse !== undefined &&
      buffered.trim().length > 0 &&
      !consumeMetadataLine(buffered)
    ) {
      yield this.decodeStreamPayload<T>(request, lastResponse, buffered, {
        id: eventId,
        retry: eventRetry,
      });
    }
  }

  private hasBlankBody<T>(response: HttpResponse<T>): boolean {
    return new TextDecoder().decode(response.raw).trim().length === 0;
  }

  private parseTrailingDataLine(pendingLine: string): string | undefined {
    const line = pendingLine.replace(/\r$/, '');
    if (!line.startsWith('data:')) {
      return undefined;
    }
    return this.parseDataValue(line);
  }

  private parseDataValue(line: string): string {
    return line.slice('data:'.length).replace(/^ /, '');
  }

  private isEventStreamResponse<T>(response: HttpResponse<T>): boolean {
    return !!response.metadata.headers['content-type']?.includes('text/event-stream');
  }

  private decodeStreamPayload<T>(
    request: Request,
    response: HttpResponse<T>,
    dataValue: string,
    fields?: SseEventFields,
    eventDiscriminator?: string,
  ): HttpResponse<T> {
    const responseMatcher = new ResponseMatcher(request.responses);
    const responseDefinition = responseMatcher.getResponseDefinition(response);
    const sse = fields === undefined ? {} : { sse: fields };

    if (!responseDefinition?.schema || responseDefinition.schema === core.cast.NEVER) {
      return { ...response, ...sse, data: undefined as T };
    }

    if (dataValue.trim().length === 0) {
      return { ...response, ...sse, data: undefined as T };
    }

    // An untyped (`type: string`) payload is handed over verbatim. The spec does not say what is
    // inside `data:`, so parsing it would throw on the JSON object a real server sends and on bare
    // text, and would quietly unquote a JSON string literal. No validation either: the value is
    // already the declared type, and the serde layer would re-reject the object it just received.
    if (request.eventShape?.rawText === true) {
      return { ...response, ...sse, data: dataValue as T };
    }

    const parsed = this.injectDiscriminator(this.parseJson(dataValue), fields, eventDiscriminator);

    return {
      ...response,
      ...sse,
      data: this.validate<T>(request, responseDefinition, parsed),
    };
  }

  private injectDiscriminator(
    parsed: unknown,
    fields?: SseEventFields,
    eventDiscriminator?: string,
  ): unknown {
    if (
      eventDiscriminator === undefined ||
      fields?.event === undefined ||
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return parsed;
    }
    const payload = parsed as Record<string, unknown>;
    if (eventDiscriminator in payload) {
      return parsed;
    }
    return { [eventDiscriminator]: fields.event, ...payload };
  }

  private decodeBody<T>(request: Request, response: HttpResponse<T>): HttpResponse<T> {
    const responseMatcher = new ResponseMatcher(request.responses);
    const responseDefinition = responseMatcher.getResponseDefinition(response);

    if (!responseDefinition || !this.hasContent(responseDefinition, response)) {
      return response;
    }

    const contentType = responseDefinition.contentType;
    const contentTypeHandlers: {
      [key: string]: (
        req: Request,
        resDef: ResponseDefinition,
        res: HttpResponse<T>,
      ) => HttpResponse<T>;
    } = {
      [ContentType.Binary]: this.decodeFile,
      [ContentType.Image]: this.decodeFile,
      [ContentType.MultipartFormData]: this.decodeMultipartFormData,
      [ContentType.Text]: this.decodeText,
      [ContentType.FormUrlEncoded]: this.decodeFormUrlEncoded,
      [ContentType.EventStream]: this.decodeEventStream,
    };

    if (contentTypeHandlers[contentType]) {
      return contentTypeHandlers[contentType].call(this, request, responseDefinition, response);
    }

    if (response.metadata.headers['content-type']?.includes('text/event-stream')) {
      return this.decodeEventStream(request, responseDefinition, response);
    }

    return this.decodeJson(request, responseDefinition, response);
  }

  private decodeFile<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, response.binaryResponse ?? response.raw),
    };
  }

  private decodeMultipartFormData<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const formData = this.fromFormData(response.raw);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, formData),
    };
  }

  private decodeText<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, decodedBody),
    };
  }

  private decodeFormUrlEncoded<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    const urlEncoded = this.fromUrlEncoded(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, urlEncoded),
    };
  }

  private decodeEventStream<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    let decodedBody = new TextDecoder().decode(response.raw);
    if (decodedBody.startsWith('data: ')) {
      decodedBody = decodedBody.substring(6);
    }
    if (decodedBody.trim().length === 0) {
      return { ...response, data: undefined as T };
    }
    // Note: this assumes that the content of data is a valid JSON string
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, this.parseJson(decodedBody)),
    };
  }

  private decodeJson<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    if (decodedBody.trim().length === 0) {
      return { ...response, data: undefined as T };
    }
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, this.parseJson(decodedBody)),
    };
  }

  /**
   * Parses a JSON response body, rethrowing parse failures as a plain Error
   * so callers don't have to special-case SyntaxError.
   */
  private parseJson(decodedBody: string): unknown {
    try {
      return JSON.parse(decodedBody);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      throw new VouchsafeApiError({
        message: `Failed to parse JSON response body: ${message}`,
        cause: e,
      });
    }
  }

  /**
   * Validates response data against the expected schema if validation is enabled.
   * @template T - The expected data type
   * @param request - The HTTP request containing validation settings
   * @param response - The response definition with schema
   * @param data - The data to validate
   * @returns The validated data (parsed if validation enabled, raw otherwise)
   */
  private validate<T>(request: Request, response: ResponseDefinition, data: any): T {
    // Fern's generated client performs no response *constraint* validation when the serde
    // layer is off — but unlike Fern, this SDK still renames wire keys to idiomatic property
    // names in the declared type, and that rename lives in the schema's own .transform(), not
    // in a separate step. A blind cast would skip the transform entirely, leaving every
    // renamed property undefined at runtime even though tsc sees it as present. safeParse runs
    // the rename on success and falls back to the untransformed raw value on failure, so a
    // payload that fails a declared constraint still never throws. response.schema is always
    // present here (same assumption every other branch of this method makes): the only two
    // call sites both check hasContent(), which requires a schema, before ever reaching this.
    const result = response.schema.safeParse(data);
    return result.success ? (result.data as T) : (data as T);
  }

  /**
   * Checks if a response should contain data based on its schema and status.
   * @template T - The response data type
   * @param responseDefinition - The response definition
   * @param response - The HTTP response
   * @returns True if the response should have content, false otherwise
   */
  private hasContent<T>(
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): boolean {
    return (
      !!responseDefinition.schema &&
      responseDefinition.schema !== core.cast.NEVER &&
      response.metadata.status !== 204
    );
  }

  /**
   * Parses URL-encoded data into an object.
   * @param urlEncodedData - The URL-encoded string
   * @returns An object with decoded key-value pairs
   */
  private fromUrlEncoded(urlEncodedData: string): object {
    const pairs = urlEncodedData.split('&');
    const result: Record<string, string> = {};

    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key && value !== undefined) {
        result[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });

    return result;
  }

  /**
   * Parses multipart form data into an object.
   * @param arrayBuffer - The raw form data as ArrayBuffer
   * @returns An object with form field names and values
   */
  private fromFormData(arrayBuffer: ArrayBuffer): Record<string, string> {
    const decoder = new TextDecoder();
    const text = decoder.decode(arrayBuffer);

    const boundary = text.split('\r\n')[0];
    const parts = text.split(boundary).slice(1, -1);

    const formDataObj: Record<string, string> = {};

    parts.forEach((part) => {
      const [header, value] = part.split('\r\n\r\n');
      const nameMatch = header.match(/name="([^"]+)"/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        formDataObj[name] = value?.trim() || '';
      }
    });

    return formDataObj;
  }
}
