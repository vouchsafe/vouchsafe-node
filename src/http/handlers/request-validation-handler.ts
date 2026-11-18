import * as core from '../../core';
import { Request } from '../transport/request';
import { ContentType, HttpResponse, RequestHandler } from '../types';

/**
 * Request handler that validates and serializes request bodies based on content type.
 * Supports JSON, XML, text, binary, form data, and multipart form data.
 */
export class RequestValidationHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request with validation.
   * @template T - The expected response data type
   * @param request - The HTTP request to validate
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    await this.validateRequest(request);

    return this.next.handle<T>(request);
  }

  /**
   * Handles a streaming HTTP request with validation.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to validate
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    await this.validateRequest(request);

    yield* this.next.stream<T>(request);
  }

  /**
   * Validates and serializes the request body based on its content type.
   * @param request - The HTTP request to validate
   * Never throws: delegates to validateBody, which still renames properties back to their wire
   * names when the customer's serde layer is off, but never enforces constraint validation.
   */
  async validateRequest(request: Request): Promise<void> {
    // Always true here, even though Fern's client validates nothing when the serde layer is
    // off: unlike Fern, this SDK still renames idiomatic property names back to their wire
    // names in the same schema used for validation, so running it is required to produce a
    // correct wire body — it is not an optional validation step to opt out of. validateBody
    // itself never throws in this mode; see its own comment below.
    const requestValidationEnabled = true;

    if (
      request.requestContentType === ContentType.Text ||
      request.requestContentType === ContentType.Image ||
      request.requestContentType === ContentType.Binary
    ) {
      request.body = request.body;
    } else if (request.requestContentType === ContentType.FormUrlEncoded) {
      request.body = this.toFormUrlEncoded(request, requestValidationEnabled);
    } else if (request.requestContentType === ContentType.MultipartFormData) {
      request.body = await this.toFormData(
        (requestValidationEnabled
          ? this.validateBody(request, request.body)
          : request.body) as Record<string, any>,
        request.filename,
        request.filenames,
      );
    } else {
      // ContentType.Json and everything else (arbitrary/unrecognized content types) serialize the
      // same way: validate-then-stringify, or stringify as-is when validation is disabled.
      // An optional body the caller left out reaches here as `undefined` (the service method only
      // adds it when supplied); there is nothing to validate, and Fern's optional-body schema
      // accepts it, so the request goes out without a body instead of failing validation.
      const serializedBody =
        requestValidationEnabled && request.body !== undefined
          ? this.validateBody(request, request.body)
          : request.body;
      request.body = JSON.stringify(this.mergeAdditionalBodyParameters(request, serializedBody));
    }
  }

  /**
   * Shallow-merges `requestOptions.additionalBodyParameters` into a JSON object body, using the
   * keys verbatim as wire names so a caller can send a field this SDK version does not declare.
   * The caller's keys win over the generated ones. An absent body becomes the extras; an array
   * or primitive body is returned untouched, since named keys cannot be merged into either.
   */
  private mergeAdditionalBodyParameters(request: Request, body: unknown): unknown {
    const { additionalBodyParameters } = request.config as {
      additionalBodyParameters?: Record<string, unknown>;
    };
    if (!additionalBodyParameters) {
      return body;
    }
    if (body === undefined || body === null) {
      return { ...additionalBodyParameters };
    }
    if (typeof body !== 'object' || Array.isArray(body)) {
      return body;
    }
    return { ...body, ...additionalBodyParameters };
  }

  /**
   * Validates a request body against its schema.
   * Never throws when the serde layer is off: unlike Fern, this SDK still renames idiomatic
   * property names back to their wire names via the schema's own transform, so it must still run.
   * A body that fails a declared constraint falls back to the untransformed value instead of
   * rejecting the call.
   */
  private validateBody(request: Request, body: unknown): unknown {
    if (!request.requestSchema) {
      return body;
    }
    // Fern's client performs no request validation when the serde layer is off — but unlike
    // Fern, this SDK still renames idiomatic property names back to their wire names via the
    // schema's own .transform(), so it must still run. Never throws: a body that fails a
    // declared constraint falls back to the untransformed value instead of rejecting the call.
    const result = request.requestSchema.safeParse(body);
    return result.success ? result.data : body;
  }

  /**
   * Converts request body to URL-encoded form data format.
   * @param request - The HTTP request with body to convert
   * @param requestValidationEnabled - Whether to validate the body against its schema first
   * @returns URL-encoded string representation of the body
   */
  toFormUrlEncoded(request: Request, requestValidationEnabled: boolean): string {
    if (request.body === undefined) {
      return '';
    }

    if (typeof request.body === 'string') {
      return request.body;
    }

    if (request.body instanceof URLSearchParams) {
      return request.body.toString();
    }

    const validatedBody = requestValidationEnabled
      ? this.validateBody(request, request.body)
      : request.body;

    if (validatedBody instanceof FormData) {
      const params = new URLSearchParams();
      validatedBody.forEach((value, key) => {
        if (value != null) {
          params.append(key, value.toString());
        }
      });
      return params.toString();
    }

    if (
      typeof validatedBody === 'object' &&
      validatedBody !== null &&
      !Array.isArray(validatedBody)
    ) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(validatedBody)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          for (const item of value) {
            if (item != null) params.append(key, `${item}`);
          }
          continue;
        }
        params.append(key, `${value}`);
      }
      return params.toString();
    }

    return '';
  }

  /**
   * Converts request body to multipart form data format.
   * Handles files (`core.file.Uploadable` — a FileLike byte source, a `{ path }` filesystem
   * reference, or a FileLike wrapped with metadata overrides — see `isUploadable` below),
   * arrays, and regular values.
   * @param body - The request body object
   * @param filename - Optional filename for single file uploads
   * @param filenames - Optional filenames array for array of file uploads
   * @returns A promise resolving to the FormData object with serialized body
   */
  async toFormData(
    body: Record<string, any>,
    filename?: string,
    filenames?: string[],
  ): Promise<FormData> {
    const formData = new FormData();

    for (const key of Object.keys(body)) {
      const value: any = body[key];
      if (value === undefined || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const v = value[i];
          if (v === undefined || v === null) {
            continue;
          }
          if (isUploadable(v)) {
            // For arrays of files, use the corresponding filename from filenames array
            const fileFilename = filenames && filenames[i] ? filenames[i] : `${key}[${i}]`;
            await appendUploadable(formData, key, v, fileFilename);
          } else {
            formData.append(key, toFormFieldValue(v));
          }
        }
      } else if (isUploadable(value)) {
        // For single files, use the provided filename or fallback to the key name
        await appendUploadable(formData, key, value, filename || key);
      } else {
        formData.append(key, toFormFieldValue(value));
      }
    }

    return formData;
  }
}

/**
 * Whether `value` is a `core.file.Uploadable` — a bare `FileLike` byte source (see
 * `isFileLike` below), a `{ path }` filesystem reference (`FromPath`), or a `FileLike` wrapped
 * with metadata overrides (`WithMetadata`). Every body field this loose — not just a known
 * file-field key — is routed through this check, matching `core/file`'s own detection. Checks
 * the `path`/`data` VALUE too (a string, a real FileLike), not just key presence — an ordinary
 * JSON object field that happens to be named `path`/`data` must not be misrouted into
 * `core.file.toMultipartDataPart`, which would throw or silently corrupt the request.
 */
function isUploadable(value: unknown): boolean {
  if (isFileLike(value)) {
    return true;
  }
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if ('path' in value) {
    return typeof (value as { path: unknown }).path === 'string';
  }
  if ('data' in value) {
    return isFileLike((value as { data: unknown }).data);
  }
  return false;
}

/**
 * Whether `value` is a bare in-memory/stream `FileLike` (not `FromPath`/`WithMetadata`) — the
 * same runtime shapes classic output's `isFileLike` recognizes, plus Node streams and Web
 * `ReadableStream`s, which `core.file.Uploadable.FileLike` also allows.
 */
function isFileLike(value: unknown): boolean {
  return (
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value) ||
    (typeof Blob !== 'undefined' && value instanceof Blob) ||
    isStreamLike(value) ||
    isReadableStreamLike(value)
  );
}

function isStreamLike(
  value: unknown,
): value is { read?: () => unknown; pipe?: (dest: unknown) => unknown } {
  return typeof value === 'object' && value !== null && ('read' in value || 'pipe' in value);
}

function isReadableStreamLike(value: unknown): value is ReadableStream {
  return typeof value === 'object' && value !== null && 'getReader' in value;
}

/**
 * Resolves `value` (a `core.file.Uploadable`) to its filename/content-type/bytes via
 * `core.file.toMultipartDataPart`, converts the bytes to a `Blob` (buffering a stream fully —
 * the native `FormData`/`Blob` API has no streaming-append primitive), and appends it.
 */
async function appendUploadable(
  formData: FormData,
  key: string,
  value: unknown,
  fallbackFilename: string,
): Promise<void> {
  const { data, filename, contentType } = await core.file.toMultipartDataPart(
    value as core.file.Uploadable,
  );
  formData.append(key, await toBlob(data, contentType), filename ?? fallbackFilename);
}

/**
 * Converts any `core.file.Uploadable.FileLike` shape to a `Blob`, buffering a stream fully.
 * Re-wraps an already-`Blob` value when `contentType` is given and differs from the blob's own
 * `type` — otherwise a `WithMetadata.contentType` override would silently lose to the blob's
 * own (possibly empty) type, defeating the one thing that field is for.
 */
async function toBlob(value: unknown, contentType?: string): Promise<Blob> {
  if (isStreamLike(value) || isReadableStreamLike(value)) {
    const buffer = await streamToBuffer(value);
    return new Blob([buffer as BlobPart], { type: contentType });
  }
  if (value instanceof Blob) {
    return contentType && value.type !== contentType
      ? new Blob([value], { type: contentType })
      : value;
  }
  return new Blob([value as BlobPart], { type: contentType });
}

/** Buffers a Node `Readable` or Web `ReadableStream` fully into memory. */
async function streamToBuffer(stream: unknown): Promise<Uint8Array> {
  if (typeof Buffer !== 'undefined') {
    const { Readable } = await import('stream');
    if (stream instanceof Readable) {
      const chunks: Buffer[] = [];
      for await (const chunk of stream as unknown as AsyncIterable<Buffer | string>) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    }
  }
  const reader = (stream as ReadableStream).getReader();
  const chunks: Uint8Array[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

/** Renders a non-file multipart field the way Fern does: dates as ISO-8601, objects as JSON, everything else as a string. */
function toFormFieldValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}
