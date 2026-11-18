import { VouchsafeApiEnvironment, VouchsafeApiEnvironmentUrls } from './http/environment';
import {
  BaseClientOptions,
  BaseRequestOptions,
  NormalizedClientOptions,
  core,
  normalizeClientOptions,
} from './http/types';
import { OAuthTokenManager } from './http/oauth/token-manager';
import { Supplier } from './http/utils/supplier';
import { makePassthroughRequest } from './http/utils/passthrough-request';
import { V1Client } from './api/resources/v1/client/Client';
import { V2Client } from './api/resources/v2/client/Client';

export declare namespace VouchsafeApiClient {
  export type Options = BaseClientOptions;
  export interface RequestOptions extends BaseRequestOptions {}
}

export class VouchsafeApiClient {
  protected readonly _options: NormalizedClientOptions<BaseClientOptions>;

  protected _v1: V1Client | undefined;

  protected _v2: V2Client | undefined;

  protected tokenManager: OAuthTokenManager = new OAuthTokenManager();

  constructor(options: BaseClientOptions) {
    this._options = normalizeClientOptions(options);
  }

  public get v1(): V1Client {
    return (this._v1 ??= new V1Client(this._options, this.tokenManager));
  }

  public get v2(): V2Client {
    return (this._v2 ??= new V2Client(this._options, this.tokenManager));
  }

  /**
   * Escape hatch for calling an endpoint this SDK doesn't wrap: resolves `input` against the
   * configured baseUrl/environment, applies the SDK's default headers, auth, timeout, and retry
   * policy, and returns the raw `Response` — no request/response schema validation.
   */
  public async fetch(
    input: Request | string | URL,
    init?: RequestInit,
    requestOptions?: core.PassthroughRequest.RequestOptions,
  ): Promise<Response> {
    return makePassthroughRequest(
      input,
      init,
      {
        baseUrl:
          this._options.baseUrl ??
          ((await Supplier.get(this._options.environment)) ?? VouchsafeApiEnvironment.Production)
            .v1,
        headers: this._options.headers,
        timeoutInSeconds: this._options.timeoutInSeconds,
        maxRetries: this._options.maxRetries,
        fetch: this._options.fetch,
        logging: this._options.logging,
      },
      requestOptions,
    );
  }
}
