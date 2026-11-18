import * as core from '../../core';
import {
  ContentType,
  HttpMethod,
  BaseClientOptions,
  RetryOptions,
  ValidationOptions,
} from '../types';
import { SerializationStyle } from '../serialization/base-serializer';
import { OAuthTokenManager } from '../oauth/token-manager';
import { VouchsafeApiError } from '../errors/throwable-error';
import { RawResponse } from '../utils/fetcher';

/**
 * Defines an expected response format with schema validation.
 * Used to match and validate responses based on content type and status code.
 */
export interface ResponseDefinition {
  /** Schema for validating the response body */
  schema: core.cast.CastSchema<any, any>;
  /** The content type of this response (e.g., 'application/json') */
  contentType: ContentType;
  /** The HTTP status code this definition applies to */
  status: number;
}

/**
 * Defines an error response format with custom error class.
 * Used to throw typed errors based on content type and status code.
 */
export interface ErrorDefinition {
  /** The error class to instantiate, exposing a static `from` factory */
  error: (new (...args: any[]) => VouchsafeApiError) & {
    from(message: string, response?: unknown): VouchsafeApiError;
  };
  /** The content type of this error response */
  contentType: ContentType;
  /** The HTTP status code this error applies to */
  status: number;
}

export type StreamEventShape =
  | { type: 'json'; messageTerminator: string; rawText?: boolean }
  | {
      type: 'sse';
      streamTerminator?: string;
      eventDiscriminator?: string;
      resumable?: boolean;
      /**
       * Hand each payload to the caller as text instead of parsing it. Set for an untyped
       * (`type: string`) item schema, which does not describe what is inside `data:`.
       */
      rawText?: boolean;
    };

/**
 * Parameters required to create a Request instance.
 * Contains all configuration needed for HTTP execution, validation, and error handling.
 *
 * @template Page - The type of paginated data items
 */
export interface CreateRequestParameters<Page = unknown[]> {
  baseUrl: string;
  method: HttpMethod;
  body?: any;
  headers: Map<string, RequestParameter>;
  queryParams: Map<string, RequestParameter>;
  pathParams: Map<string, RequestParameter>;
  cookies: Map<string, RequestParameter>;
  path: string;
  config: BaseClientOptions;
  responses: ResponseDefinition[];
  errors: ErrorDefinition[];
  requestSchema: core.cast.CastSchema<any, any>;
  requestContentType: ContentType;
  pagination?: RequestPagination<Page> | RequestCursorPagination<Page>;
  eventShape?: StreamEventShape;
  onStreamOpen?: (rawResponse: RawResponse) => void;
  filename?: string;
  filenames?: string[];
  scopes?: Set<string>;
  tokenManager: OAuthTokenManager;
}

/**
 * Represents a request parameter with serialization metadata.
 * Wraps a value with OpenAPI serialization instructions for proper encoding.
 */
export interface RequestParameter {
  /** The parameter name (may be undefined for path substitution) */
  key: string | undefined;
  /** The actual parameter value */
  value: unknown;
  /** Whether to explode arrays/objects into multiple parameters */
  explode: boolean;
  /** Whether to URL-encode the value */
  encode: boolean;
  /** The OpenAPI serialization style (e.g., SIMPLE, FORM, MATRIX) */
  style: SerializationStyle;
  /** Whether this parameter is a pagination limit */
  isLimit: boolean;
  /** Whether this parameter is a pagination offset */
  isOffset: boolean;
  /** Whether this parameter is a pagination cursor */
  isCursor: boolean;
}

/**
 * Configuration for limit-offset pagination.
 * Used for traditional page-based pagination with size and offset.
 *
 * @template Page - The type of page data
 */
export interface RequestPagination<Page> {
  /** The number of items per page */
  pageSize?: number;
  /** JSON path to extract page data from response */
  pagePath: string[];
  /** Schema for validating page data */
  pageSchema?: core.cast.CastSchema<any, Page>;
}

/**
 * Configuration for cursor-based pagination.
 * Used for stateless pagination with cursor tokens.
 *
 * @template Page - The type of page data
 */
export interface RequestCursorPagination<Page> {
  /** JSON path to extract page data from response */
  pagePath: string[];
  /** Schema for validating page data */
  pageSchema?: core.cast.CastSchema<any, Page>;
  /** JSON path to extract next cursor from response */
  cursorPath: string[];
  /** Schema for validating cursor value */
  cursorSchema?: core.cast.CastSchema<any, any>;
}

/**
 * Type guard to determine if pagination configuration is cursor-based.
 *
 * @template Page - The type of page data
 * @param pagination - The pagination configuration to check
 * @returns true if cursor-based pagination, false otherwise
 */
export function isRequestCursorPagination<Page>(
  pagination: RequestPagination<Page> | RequestCursorPagination<Page> | undefined,
): pagination is RequestCursorPagination<Page> {
  return !!pagination && 'cursorPath' in pagination;
}
