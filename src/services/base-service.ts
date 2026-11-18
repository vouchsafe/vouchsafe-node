import { VouchsafeApiEnvironment, VouchsafeApiEnvironmentUrls } from '../http/environment';
import { HttpClient } from '../http/client';
import { BaseClientOptions, NormalizedClientOptions, normalizeClientOptions } from '../http/types';
import { Supplier } from '../http/utils/supplier';
import { OAuthTokenManager } from '../http/oauth/token-manager';

/**
 * Base service class that all API service classes extend.
 * Provides common functionality including HTTP client management and configuration.
 */
export class BaseService {
  /** The HTTP client instance used to make API requests */
  protected client: HttpClient;

  /** Service-level configuration overrides */
  protected serviceConfig?: Partial<BaseClientOptions>;

  protected readonly _options: NormalizedClientOptions<BaseClientOptions>;

  constructor(
    options: BaseClientOptions,
    protected tokenManager: OAuthTokenManager,
  ) {
    this._options = normalizeClientOptions(options);
    this.client = new HttpClient(this._options);
  }

  /**
   * Sets service-level configuration that applies to all methods in this service.
   * @param config - Partial configuration to override SDK-level defaults
   * @returns This service instance for method chaining
   */
  protected setConfig(config: Partial<BaseClientOptions>): this {
    this.serviceConfig = config;
    return this;
  }

  /**
   * Recursively merges two objects. Plain nested objects are merged key-by-key so a
   * partial override (e.g. `{ retry: { attempts: 5 } }`) only overwrites the specified
   * keys instead of replacing the whole nested object. Arrays and non-plain values are
   * replaced wholesale.
   *
   * Override keys with the value `undefined` are skipped so the base value is preserved,
   * matching the common JS merge idiom (e.g. lodash.merge). To explicitly clear a key,
   * assign `null` or omit the key from the override entirely.
   */
  private static deepMerge<T extends object>(base: T, override: Partial<T>): T {
    const result = { ...base } as Record<string, unknown>;
    for (const [key, value] of Object.entries(override)) {
      const existing = result[key];
      if (BaseService.isPlainObject(value) && BaseService.isPlainObject(existing)) {
        result[key] = BaseService.deepMerge(existing, value);
      } else if (value !== undefined) {
        result[key] = value;
      }
    }
    return result as T;
  }

  private static isPlainObject(value: unknown): value is Record<string, unknown> {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.getPrototypeOf(value) === Object.prototype
    );
  }

  /**
   * Resolves configuration from the hierarchy: requestConfig > methodConfig > serviceConfig > sdkConfig
   * Deep-merges all config levels so partial nested overrides (e.g. `{ retry: { attempts: 5 } }`)
   * preserve unoverridden sibling keys from the SDK default.
   * @param methodConfig - Method-level configuration override
   * @param requestConfig - Request-level configuration override
   * @returns Merged configuration with all overrides applied
   */
  protected getResolvedConfig(
    methodConfig?: Partial<BaseClientOptions>,
    requestConfig?: Partial<BaseClientOptions>,
  ): BaseClientOptions {
    let merged: BaseClientOptions = { ...this._options } as BaseClientOptions;
    if (this.serviceConfig) {
      merged = BaseService.deepMerge(merged, this.serviceConfig);
    }
    if (methodConfig) {
      merged = BaseService.deepMerge(merged, methodConfig);
    }
    if (requestConfig) {
      merged = BaseService.deepMerge(merged, requestConfig);
    }
    return merged;
  }

  protected set baseUrl(baseUrl: Supplier<string>) {
    this._options.baseUrl = baseUrl;
  }

  protected set timeoutInSeconds(timeoutInSeconds: number) {
    this._options.timeoutInSeconds = timeoutInSeconds;
  }

  protected set environment(
    environment: Supplier<VouchsafeApiEnvironment | VouchsafeApiEnvironmentUrls>,
  ) {
    this._options.environment = environment;
  }

  protected set clientId(clientId: string) {
    this._options.clientId = clientId;
  }

  protected set clientSecret(clientSecret: string) {
    this._options.clientSecret = clientSecret;
  }

  protected set oAuthBaseUrl(oAuthBaseUrl: string) {
    this._options.oAuthBaseUrl = oAuthBaseUrl;
  }

  protected set accessToken(accessToken: string) {
    this._options.accessToken = accessToken;
  }
}
