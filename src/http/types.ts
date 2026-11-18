import { VouchsafeApiEnvironment, VouchsafeApiEnvironmentUrls } from './environment';
import { Request } from './transport/request';
import { Supplier } from './utils/supplier';
import { ConsoleLogger, ILogger, LogConfig, LogLevel, Logger } from './utils/logger';
import { RawResponse } from './utils/fetcher';

/**
 * Standard HTTP methods supported by the SDK.
 */
export type HttpMethod =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

/**
 * SDK configuration interface.
 * Contains all settings required to initialize and configure the SDK.
 */
export interface BaseConfig {
  /** Number of retries after the initial attempt (e.g. 1 = up to 2 total attempts). Ignored if `retry.attempts` (a total-attempts count) is also set. */
  maxRetries?: number;
  /** Configure SDK logging, or pass through an already-resolved `Logger` (e.g. one built for another client) unchanged. Silent by default — set `silent: false` to enable output. */
  logging?: LogConfig | Logger;
  retry?: RetryOptions;
  validation?: ValidationOptions;
  headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
  fetch?: (url: any, init: any) => Promise<Response>;
  stream?: { reconnectionEnabled?: boolean; maxReconnectionAttempts?: number };
  abortSignal?: AbortSignal;
  auth?: boolean;
  baseUrl?: Supplier<string>;
  timeoutInSeconds?: number;
  environment?: Supplier<VouchsafeApiEnvironment | VouchsafeApiEnvironmentUrls>;
  oAuthBaseUrl?: string;
}

interface ClientCredentialAuthConfig extends BaseConfig {
  clientId: string;
  clientSecret: string;
  accessToken?: never;
}

interface TokenAuthConfig extends BaseConfig {
  clientSecret?: never;
  clientId?: never;
  accessToken: string;
}

export type BaseClientOptions = ClientCredentialAuthConfig | TokenAuthConfig;

/**
 * Per-request configuration overrides — a narrower, request-scoped counterpart to the
 * constructor-level config above.
 */
export interface BaseRequestOptions {
  timeoutInSeconds?: number;
  maxRetries?: number;
  abortSignal?: AbortSignal;
  queryParams?: Record<string, unknown>;
  additionalBodyParameters?: Record<string, unknown>;
  headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
  stream?: { reconnectionEnabled?: boolean; maxReconnectionAttempts?: number };
}

export declare namespace core {
  export namespace PassthroughRequest {
    /**
     * Per-call options for the root-client passthrough `fetch()` escape hatch.
     */
    export interface RequestOptions {
      headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
      timeoutInSeconds?: number;
      maxRetries?: number;
      abortSignal?: AbortSignal;
    }
  }
}

/**
 * Constructor-level config with `logging` resolved to a real, level-filtering `Logger` instance,
 * so downstream code never re-resolves it from the raw `LogConfig | Logger` input.
 */
export type NormalizedClientOptions<T extends BaseClientOptions = BaseClientOptions> = T & {
  logging: Logger;
};

export function normalizeClientOptions<T extends BaseClientOptions = BaseClientOptions>(
  options: T,
): NormalizedClientOptions<T> {
  return {
    ...options,
    logging: Logger.from(options.logging),
  } as NormalizedClientOptions<T>;
}

type _LogConfig = LogConfig;
type _LogLevel = LogLevel;
type _ILogger = ILogger;
const _LogLevelValue = LogLevel;
type _ConsoleLoggerInstance = ConsoleLogger;
const _ConsoleLoggerValue = ConsoleLogger;

export namespace logging {
  export type LogConfig = _LogConfig;
  export type LogLevel = _LogLevel;
  export const LogLevel = _LogLevelValue;
  export type ILogger = _ILogger;
  export type ConsoleLogger = _ConsoleLoggerInstance;
  export const ConsoleLogger = _ConsoleLoggerValue;
}

/**
 * Metadata about an HTTP response.
 * Contains status information and headers from the server response.
 */
export interface HttpMetadata {
  /** HTTP status code (e.g., 200, 404, 500) */
  status: number;
  /** HTTP status text message (e.g., "OK", "Not Found") */
  statusText: string;
  /** Response headers as key-value pairs */
  headers: Record<string, string>;
}

/**
 * Standard HTTP response with typed data.
 * @template T - The type of the response data
 */
export interface HttpResponse<T = unknown> {
  /** Parsed response data (optional) */
  data?: T;
  /** Response metadata (status, headers, etc.) */
  metadata: HttpMetadata;
  /** Raw response object from the HTTP client */
  raw: ArrayBuffer;
  /** Server-sent event fields, present only on frames decoded from an SSE stream */
  sse?: SseEventFields;
  /** Lazy binary accessor, present only for binary/image response bodies */
  binaryResponse?: BinaryResponse;
  /**
   * Fern drop-in parity (FSDK-429): unlike `raw` (an `ArrayBuffer` unless `responseHeaders` is
   * configured on), this is always populated — `WithRawResponse`/thrown errors' `rawResponse`
   * field need real response metadata regardless of that unrelated config flag.
   */
  rawResponse?: RawResponse;
}

/**
 * A binary response body exposed as a lazy accessor instead of an eagerly-buffered value, so a
 * caller can read (and cancel) the download incrementally. Mirrors Fern's own
 * `core/fetcher/BinaryResponse.ts` shape.
 */
export interface BinaryResponse {
  readonly bodyUsed: boolean;
  stream(): ReadableStream<Uint8Array> | null;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  bytes?(): Promise<Uint8Array>;
}

/** The `event:`, `id:` and `retry:` fields of a single server-sent event frame. */
export interface SseEventFields {
  event?: string;
  id?: string;
  retry?: number;
}

/**
 * HTTP response for paginated API endpoints.
 * Marker interface extending HttpResponse for type safety with pagination.
 * @template T - The type of a single page of data
 */
export interface PaginatedHttpResponse<T = unknown> extends HttpResponse<T> {
  // Marker interface for pagination responses
}

/**
 * HTTP response for cursor-paginated API endpoints.
 * Includes a cursor for fetching the next page of results.
 * @template T - The type of a single page of data
 */
export interface CursorPaginatedHttpResponse<T = unknown> extends HttpResponse<T> {
  /** Cursor string for fetching the next page, null if no more pages, undefined if not applicable */
  nextCursor?: string | null;
}

/**
 * Interface for request handlers in the chain of responsibility pattern.
 * Handlers process requests sequentially, each performing specific operations.
 */
export interface RequestHandler {
  /** Reference to the next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   */
  handle<T>(request: Request): Promise<HttpResponse<T>>;

  /**
   * Handles a streaming HTTP request.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   */
  stream<T>(request: Request): AsyncGenerator<HttpResponse<T>>;
}

/**
 * Supported content types for HTTP requests and responses.
 * Determines how the SDK serializes requests and parses responses.
 */
export enum ContentType {
  /** JSON format (application/json) */
  Json = 'json',
  /**
   * @deprecated XML is handled as text. Use {@link ContentType.Text} instead.
   * Kept as an alias for backward compatibility; will be removed in a future major version.
   */
  Xml = 'text',
  /** PDF document (application/pdf) */
  Pdf = 'pdf',
  /** Image file (image/*) */
  Image = 'image',
  /** Generic file */
  File = 'file',
  /** Binary data (application/octet-stream) */
  Binary = 'binary',
  /** URL-encoded form data (application/x-www-form-urlencoded) */
  FormUrlEncoded = 'form',
  /** Plain text (text/plain) */
  Text = 'text',
  /** Multipart form data for file uploads (multipart/form-data) */
  MultipartFormData = 'multipartFormData',
  /** Server-sent events stream (text/event-stream) */
  EventStream = 'eventStream',
  /** No content (HTTP 204) */
  NoContent = 'noContent',
}

export interface Options<T> {
  responseSchema: { parse: (raw: any) => any; safeParse: (raw: any) => any };
  requestSchema?: { parse: (raw: any) => any; safeParse: (raw: any) => any };
  body?: any;
  requestContentType?: ContentType;
  responseContentType?: ContentType;
  abortSignal?: AbortSignal;
  queryParams?: Record<string, unknown>;
  retry?: RetryOptions;
}

export interface RetryOptions {
  attempts: number;
  delayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  jitterMs?: number;
  maxRetryAfterDelayMs?: number;
  statusCodesToRetry?: number[];
  httpMethodsToRetry?: HttpMethod[];
}

export interface ValidationOptions {
  responseValidation?: boolean;
  /** No-op in this SDK: request bodies always run through their schema when the serde layer is off, to rename properties back to their wire names. */
  requestValidation?: boolean;
}
