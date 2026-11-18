import * as core from '../../../../core';
import { BaseService } from '../../../../services/base-service';
import { BaseClientOptions, BaseRequestOptions } from '../../../../http/types';
import { VouchsafeApiError } from '../../../../http/errors/throwable-error';
import { Supplier } from '../../../../http/utils/supplier';
import { RiskClient } from '../resources/risk/client/Client';
import { OAuthTokenManager } from '../../../../http/oauth/token-manager';

export declare namespace V2Client {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for V2 operations.
 * Provides methods to interact with V2-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class V2Client extends BaseService {
  public readonly risk: RiskClient;

  constructor(config: BaseClientOptions, tokenManager: OAuthTokenManager) {
    super(config, tokenManager);
    this.risk = new RiskClient(config, tokenManager);
  }
}
