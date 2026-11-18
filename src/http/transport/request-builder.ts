import * as core from '../../core';
import { Request } from './request';
import { toBase64 as encodeBase64, RUNTIME } from '../utils/runtime';
import {
  CreateRequestParameters,
  RequestParameter,
  RequestPagination,
  RequestCursorPagination,
  ResponseDefinition,
  ErrorDefinition,
  StreamEventShape,
} from './types';
import { ContentType, HttpMethod, BaseClientOptions } from '../types';
import { VouchsafeApiEnvironment } from '../environment';
import { SerializationStyle } from '../serialization/base-serializer';
import { OAuthTokenManager } from '../oauth/token-manager';

/**
 * Builder pattern implementation for constructing HTTP requests.
 * Provides a fluent interface for configuring all aspects of an API request.
 * @template Page - The type for paginated response pages
 */
export class RequestBuilder<Page extends unknown[] = unknown[]> {
  /** Internal request parameters being built */
  private params: CreateRequestParameters<Page>;

  /**
   * Creates a new request builder with default configuration.
   * Initializes retry settings, validation options, and empty parameter collections.
   */
  constructor() {
    this.params = {
      baseUrl: VouchsafeApiEnvironment.Production.v1,
      method: 'GET',
      path: '',
      config: {
        clientId: '',
        clientSecret: '',
        retry: {
          delayMs: 1000,
          maxDelayMs: 60000,
          backoffFactor: 2,
          jitterMs: 50,
          httpMethodsToRetry: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
        },
        validation: { responseValidation: true, requestValidation: true },
      } as BaseClientOptions,
      responses: [],
      errors: [],
      requestSchema: core.cast.identity<unknown>(),
      requestContentType: ContentType.Json,
      pathParams: new Map(),
      queryParams: new Map(),
      headers: new Map(),
      cookies: new Map(),
      tokenManager: new OAuthTokenManager(),
    };
    this.addHeaderParam({ key: 'User-Agent', value: '@vouchsafe/node/1.0.0-beta.1' });
    this.addHeaderParam({ key: 'X-Fern-Language', value: 'JavaScript' });
    this.addHeaderParam({ key: 'X-Fern-SDK-Name', value: '@vouchsafe/node' });
    this.addHeaderParam({ key: 'X-Fern-SDK-Version', value: '1.0.0-beta.1' });
    this.addHeaderParam({ key: 'X-Fern-Runtime', value: RUNTIME.type });
    if (RUNTIME.version !== undefined) {
      this.addHeaderParam({ key: 'X-Fern-Runtime-Version', value: RUNTIME.version });
    }
  }

  setConfig(config: BaseClientOptions): RequestBuilder<Page> {
    // Merge user config with default config, preserving defaults for unspecified nested properties
    let mergedRetry = config.retry ?? this.params.config.retry;
    if (config.retry !== undefined && this.params.config.retry !== undefined) {
      mergedRetry = { ...this.params.config.retry, ...config.retry };
    }

    let mergedValidation = config.validation ?? this.params.config.validation;
    if (config.validation !== undefined && this.params.config.validation !== undefined) {
      mergedValidation = { ...this.params.config.validation, ...config.validation };
    }

    this.params.config = {
      ...this.params.config,
      ...config,
      ...(mergedRetry !== undefined && { retry: mergedRetry }),
      ...(mergedValidation !== undefined && { validation: mergedValidation }),
    } as BaseClientOptions;
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        this.addHeaderParam({ key, value });
      }
    }
    return this;
  }

  /**
   * Sets the base URL for the request.
   *
   * The baseUrl-vs-environment fallback and `Supplier<string>` resolution both happen upstream
   * (in the generated method body, via `Supplier.get()`) — this just assigns the already-resolved
   * string, since `baseUrl` on the config may be a value, a promise, or a function.
   *
   * @param baseUrl - The already-resolved base URL, or undefined to leave the current default
   * @returns This builder instance for method chaining
   */
  setBaseUrl(baseUrl?: string): RequestBuilder<Page> {
    if (baseUrl) {
      this.params.baseUrl = baseUrl;
    }
    return this;
  }

  setMethod(method: HttpMethod): RequestBuilder<Page> {
    this.params.method = method;
    return this;
  }

  setPath(path: string): RequestBuilder<Page> {
    this.params.path = path;
    return this;
  }

  setRequestContentType(contentType: ContentType): RequestBuilder<Page> {
    this.params.requestContentType = contentType;
    return this;
  }

  setRequestSchema(requestSchema: core.cast.CastSchema<any, any>): RequestBuilder<Page> {
    this.params.requestSchema = requestSchema;
    return this;
  }

  setFilename(filename?: string): RequestBuilder<Page> {
    if (filename !== undefined) {
      this.params.filename = filename;
    }
    return this;
  }

  setFilenames(filenames?: string[]): RequestBuilder<Page> {
    if (filenames !== undefined) {
      this.params.filenames = filenames;
    }
    return this;
  }

  setPagination(pagination: RequestPagination<Page>): RequestBuilder<Page> {
    this.params.pagination = pagination;
    return this;
  }

  setEventShape(eventShape: StreamEventShape): RequestBuilder<Page> {
    this.params.eventShape = eventShape;
    return this;
  }

  setCursorPagination(pagination: RequestCursorPagination<Page>): RequestBuilder<Page> {
    this.params.pagination = pagination;
    return this;
  }

  setScopes(scopes: string[]): RequestBuilder<Page> {
    this.params.scopes = new Set(scopes);
    return this;
  }

  setTokenManager(tokenManager: OAuthTokenManager): RequestBuilder<Page> {
    this.params.tokenManager = tokenManager;
    return this;
  }

  addAccessTokenAuth(accessToken?: string, prefix?: string): RequestBuilder<Page> {
    if (accessToken === undefined) {
      return this;
    }

    this.params.headers.set('Authorization', {
      key: 'Authorization',
      value: `${prefix ?? 'Bearer'} ${accessToken}`,
      explode: false,
      style: SerializationStyle.SIMPLE,
      // Header values are not URL-encoded; `encode` only means something for path/query params.
      encode: false,
      isLimit: false,
      isOffset: false,
      isCursor: false,
    });
    return this;
  }

  /**
   * Sets one or more auth-derived headers at once, replacing whichever single header
   * `addAccessTokenAuth`/`addBasicAuth`/`addApiKeyAuth` would otherwise set — used when
   * `BaseClientOptions.auth` overrides the default credential with an arbitrary header set (a
   * custom `AuthProvider`, a plain function, or `false` to disable auth outright). `undefined`
   * (the `false`/disabled case, or no headers returned) sets nothing, matching those methods'
   * own no-op-on-`undefined` convention.
   */
  addAuthHeaders(headers?: Record<string, string>): RequestBuilder<Page> {
    if (headers === undefined) {
      return this;
    }

    for (const [key, value] of Object.entries(headers)) {
      this.params.headers.set(key, {
        key,
        value,
        explode: false,
        style: SerializationStyle.SIMPLE,
        // Header values are not URL-encoded; `encode` only means something for path/query params.
        encode: false,
        isLimit: false,
        isOffset: false,
        isCursor: false,
      });
    }
    return this;
  }

  addBasicAuth(username?: string, password?: string): RequestBuilder<Page> {
    if (username === undefined || password === undefined) {
      return this;
    }

    this.params.headers.set('Authorization', {
      key: 'Authorization',
      value: `Basic ${this.toBase64(`${username}:${password}`)}`,
      explode: false,
      style: SerializationStyle.SIMPLE,
      // Header values are not URL-encoded; `encode` only means something for path/query params.
      encode: false,
      isLimit: false,
      isOffset: false,
      isCursor: false,
    });
    return this;
  }

  addApiKeyAuth(
    apiKey?: string,
    keyName?: string,
    location?: 'header' | 'query' | 'cookie',
  ): RequestBuilder<Page> {
    if (apiKey === undefined) {
      return this;
    }

    const resolvedKeyName = keyName ?? 'X-API-KEY';
    const resolvedLocation = location ?? 'header';
    // Query params use `form`/explode-true so they render as `key=value`;
    // headers and cookies render the value plainly (`simple`/explode-false).
    const isQuery = resolvedLocation === 'query';
    const param = {
      key: resolvedKeyName,
      value: apiKey,
      explode: isQuery,
      style: isQuery ? SerializationStyle.FORM : SerializationStyle.SIMPLE,
      // Query values go through the FORM branch, which always URL-encodes regardless of this flag.
      // Header/cookie values are not URL-encoded, so `encode` must be false for those locations.
      encode: isQuery,
      isLimit: false,
      isOffset: false,
      isCursor: false,
    };

    if (resolvedLocation === 'query') {
      this.params.queryParams.set(resolvedKeyName, param);
    } else if (resolvedLocation === 'cookie') {
      this.params.cookies.set(resolvedKeyName, param);
    } else {
      this.params.headers.set(resolvedKeyName, param);
    }
    return this;
  }

  addResponse(response: ResponseDefinition): RequestBuilder<Page> {
    this.params.responses.push(response);
    return this;
  }

  addError(error: ErrorDefinition): RequestBuilder<Page> {
    this.params.errors.push(error);
    return this;
  }

  addBody(body?: any): RequestBuilder<Page> {
    if (body !== undefined) {
      this.params.body = body;
    }
    return this;
  }

  addPathParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.pathParams.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.SIMPLE,
      encode: param.encode ?? true,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
      isCursor: !!param.isCursor,
    });

    return this;
  }

  addQueryParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.key === undefined) {
      return this;
    }

    this.params.queryParams.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.FORM,
      encode: param.encode ?? true,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
      isCursor: !!param.isCursor,
    });

    return this;
  }

  addHeaderParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.headers.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.SIMPLE,
      encode: param.encode ?? false,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
      isCursor: !!param.isCursor,
    });

    return this;
  }

  addCookieParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.cookies.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.FORM,
      encode: param.encode ?? false,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
      isCursor: !!param.isCursor,
    });

    return this;
  }

  /**
   * Builds and returns the configured Request object.
   * Call this method after configuring all request parameters.
   * @returns A new Request instance with all configured parameters
   */
  public build(): Request<Page> {
    const { queryParams } = this.params.config as { queryParams?: Record<string, unknown> };
    for (const [key, value] of Object.entries(queryParams ?? {})) {
      const serialized = core.url.toQueryString({ [key]: value }, { arrayFormat: 'repeat' });
      if (!serialized) {
        continue;
      }
      const grouped = new Map<string, string[]>();
      for (const pair of serialized.split('&')) {
        const [encodedName, encodedValue = ''] = pair.split('=');
        const name = decodeURIComponent(encodedName);
        grouped.set(name, [...(grouped.get(name) ?? []), decodeURIComponent(encodedValue)]);
      }
      if (!grouped.has(key)) {
        this.params.queryParams.delete(key);
      }
      for (const [name, values] of grouped) {
        this.addQueryParam({ key: name, value: values.length > 1 ? values : values[0] });
      }
    }
    return new Request<Page>(this.params);
  }

  private toBase64(str: string): string {
    return encodeBase64(str);
  }
}
