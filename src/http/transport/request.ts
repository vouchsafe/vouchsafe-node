import * as core from '../../core';
import {
  ContentType,
  HttpMethod,
  BaseClientOptions,
  RetryOptions,
  ValidationOptions,
} from '../types';
import { PathSerializer } from '../serialization/path-serializer';
import { QuerySerializer } from '../serialization/query-serializer';
import { HeaderSerializer } from '../serialization/header-serializer';
import { CookieSerializer } from '../serialization/cookie-serializer';
import { HttpRequest } from '../hooks/hook';
import { SerializationStyle } from '../serialization/base-serializer';
import {
  CreateRequestParameters,
  RequestParameter,
  RequestPagination,
  RequestCursorPagination,
  ResponseDefinition,
  ErrorDefinition,
  isRequestCursorPagination,
  StreamEventShape,
} from './types';
import { RawResponse } from '../utils/fetcher';
import { OAuthTokenManager } from '../oauth/token-manager';

/**
 * Represents an HTTP request with all necessary configuration and parameters.
 * Handles path/query/header/cookie serialization, pagination, validation, and retry logic.
 * This is the core request object passed through the handler chain for execution.
 *
 * @template PageSchema - The type of paginated data returned by this request
 */
export class Request<PageSchema = unknown[]> {
  public baseUrl: string = '';

  public headers: Map<string, RequestParameter> = new Map();

  public queryParams: Map<string, RequestParameter> = new Map();

  public pathParams: Map<string, RequestParameter> = new Map();

  public cookies: Map<string, RequestParameter> = new Map();

  public body?: any;

  public method: HttpMethod;

  public path: string;

  public config: BaseClientOptions;

  public responses: ResponseDefinition[];

  public errors: ErrorDefinition[];

  public requestSchema: core.cast.CastSchema<any, any>;

  public requestContentType: ContentType;

  public pagination?: RequestPagination<PageSchema> | RequestCursorPagination<PageSchema>;

  public eventShape?: StreamEventShape;

  public onStreamOpen?: (rawResponse: RawResponse) => void;

  public filename?: string;

  public filenames?: string[];

  public scopes?: Set<string>;

  public tokenManager: OAuthTokenManager;
  private readonly pathPattern: string;

  constructor(params: CreateRequestParameters<PageSchema>) {
    this.baseUrl = params.baseUrl;
    this.method = params.method;
    this.pathPattern = params.path;
    this.body = params.body;
    this.path = this.constructPath();
    this.config = params.config;
    this.pathParams = params.pathParams;
    this.headers = params.headers;
    this.queryParams = params.queryParams;
    this.cookies = params.cookies;
    this.responses = params.responses;
    this.errors = params.errors;
    this.requestSchema = params.requestSchema;
    this.requestContentType = params.requestContentType;
    this.pagination = params.pagination;
    this.eventShape = params.eventShape;
    this.onStreamOpen = params.onStreamOpen;
    this.filename = params.filename;
    this.filenames = params.filenames;
    this.scopes = params.scopes;
    this.tokenManager = params.tokenManager;
  }

  /**
   * Adds a header parameter to the request with OpenAPI serialization rules.
   *
   * @param key - The header name
   * @param param - The parameter configuration including value, style, and encoding options
   */
  addHeaderParam(key: string, param: RequestParameter): void {
    if (param.value === undefined) {
      return;
    }

    if (param.explode === undefined) {
      param.explode = false;
    }

    if (param.style === undefined) {
      param.style = SerializationStyle.SIMPLE;
    }

    if (param.encode === undefined) {
      param.encode = false;
    }

    this.headers.set(key, param);
  }

  /**
   * Adds a query parameter to the request with OpenAPI serialization rules.
   *
   * @param key - The query parameter name
   * @param param - The parameter configuration including value, style, and encoding options
   */
  addQueryParam(key: string, param: RequestParameter): void {
    if (param.value === undefined) {
      return;
    }

    if (param.explode === undefined) {
      param.explode = true;
    }

    if (param.style === undefined) {
      param.style = SerializationStyle.FORM;
    }

    if (param.encode === undefined) {
      param.encode = true;
    }

    this.queryParams.set(key, param);
  }

  /**
   * Adds a path parameter to the request with OpenAPI serialization rules.
   *
   * @param key - The path parameter name (matches template variable in path pattern)
   * @param param - The parameter configuration including value, style, and encoding options
   */
  addPathParam(key: string, param: RequestParameter): void {
    if (param.value === undefined) {
      return;
    }

    if (param.explode === undefined) {
      param.explode = false;
    }

    if (param.style === undefined) {
      param.style = SerializationStyle.SIMPLE;
    }

    if (param.encode === undefined) {
      param.encode = true;
    }

    this.pathParams.set(key, param);
  }

  /**
   * Sets the request body if the value is defined.
   *
   * @param body - The request body to send
   */
  addBody(body: any): void {
    if (body === undefined) {
      return;
    }

    this.body = body;
  }

  /**
   * Updates this request from a modified hook request.
   * Used after hooks modify the request to sync changes back to the internal Request object.
   *
   * @param hookRequest - The modified request from hook processing
   */
  public updateFromHookRequest(hookRequest: HttpRequest): void {
    this.baseUrl = hookRequest.baseUrl;
    this.method = hookRequest.method;
    this.path = hookRequest.path;
    this.body = hookRequest.body;
  }

  /**
   * Constructs the complete URL by combining base URL, path with substituted parameters,
   * and serialized query string.
   *
   * @returns The fully constructed URL ready for HTTP execution
   */
  public constructFullUrl(): string {
    const queryString = new QuerySerializer().serialize(this.queryParams);
    const path = this.constructPath();
    let baseUrl = this.baseUrl;

    return `${baseUrl}${path}${queryString}`;
  }

  /**
   * Creates a copy of this request with optional parameter overrides.
   * Useful for pagination where you need to modify parameters while keeping the rest intact.
   *
   * @param overrides - Optional parameters to override in the copied request
   * @returns A new Request instance with the specified overrides
   */
  public copy(overrides?: Partial<CreateRequestParameters>) {
    const createRequestParams: CreateRequestParameters = {
      baseUrl: overrides?.baseUrl ?? this.baseUrl,
      errors: overrides?.errors ?? this.errors,
      method: overrides?.method ?? this.method,
      path: overrides?.path ?? this.path,
      body: overrides?.body ?? this.body,
      config: overrides?.config ?? this.config,
      pathParams: overrides?.pathParams ?? this.pathParams,
      queryParams: overrides?.queryParams ?? this.queryParams,
      headers: overrides?.headers ?? this.headers,
      cookies: overrides?.cookies ?? this.cookies,
      responses: overrides?.responses ?? this.responses,
      requestSchema: overrides?.requestSchema ?? this.requestSchema,
      requestContentType: overrides?.requestContentType ?? this.requestContentType,
      eventShape: overrides?.eventShape ?? this.eventShape,
      onStreamOpen: overrides?.onStreamOpen ?? this.onStreamOpen,
      filename: overrides?.filename ?? this.filename,
      filenames: overrides?.filenames ?? this.filenames,
      scopes: overrides?.scopes,
      tokenManager: this.tokenManager,
    };
    return new Request({
      ...createRequestParams,
      ...overrides,
    });
  }

  /**
   * Serializes headers to a format suitable for HTTP execution.
   *
   * @returns Serialized headers as HeadersInit, or undefined if no headers
   */
  public getHeaders(): HeadersInit | undefined {
    if (!this.headers || !this.headers.size) {
      return undefined;
    }

    return new HeaderSerializer().serialize(this.headers);
  }

  /**
   * Serializes cookies to a format suitable for HTTP execution.
   *
   * @returns Serialized cookies as a record, or undefined if no cookies
   */
  public getCookies(): Record<string, string> | undefined {
    if (!this.cookies || !this.cookies.size) {
      return undefined;
    }

    return new CookieSerializer().serialize(this.cookies);
  }

  /**
   * Advances pagination parameters to fetch the next page.
   * Handles both cursor-based and limit-offset pagination strategies.
   *
   * @param cursor - The cursor value for cursor-based pagination (optional for limit-offset)
   * @param offsetIncrement - Fallback increment for offset pagination with no declared `pageSize`
   * (stepless offset — gap doc row 200), where the caller only learns the increment after fetching
   * a page (its item count). Ignored whenever `pageSize` is set, which always wins.
   */
  public nextPage(cursor?: string, offsetIncrement?: number): void {
    if (!this.pagination) {
      return;
    }

    // Check if this is cursor pagination using type guard
    if (isRequestCursorPagination(this.pagination)) {
      const cursorParam = this.getCursorParam();
      if (cursorParam && cursor !== undefined) {
        cursorParam.value = cursor;
      }
      return;
    }

    // Handle limit-offset pagination
    const offsetParam = this.getOffsetParam();
    if (offsetParam) {
      const increment = this.pagination.pageSize ?? offsetIncrement;
      if (increment === undefined) {
        throw new Error('pageSize is required for limit-offset pagination');
      }
      offsetParam.value = Number(offsetParam.value) + increment;
    }
  }

  private constructPath(): string {
    return new PathSerializer().serialize(this.pathPattern, this.pathParams);
  }

  private getOffsetParam(): RequestParameter | undefined {
    const offsetParam = this.getAllParams().find((param) => param.isOffset);
    return offsetParam;
  }

  private getCursorParam(): RequestParameter | undefined {
    const cursorParam = this.getAllParams().find((param) => param.isCursor);
    return cursorParam;
  }

  private getAllParams(): RequestParameter[] {
    const allParams: RequestParameter[] = [];

    this.headers.forEach((val, _) => {
      allParams.push(val);
    });

    this.queryParams.forEach((val, _) => {
      allParams.push(val);
    });

    this.pathParams.forEach((val, _) => {
      allParams.push(val);
    });

    this.cookies.forEach((val, _) => {
      allParams.push(val);
    });

    return allParams;
  }
}
