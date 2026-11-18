import * as core from '../../../../core';
import { BaseService } from '../../../../services/base-service';
import { BaseClientOptions, BaseRequestOptions } from '../../../../http/types';
import { VouchsafeApiError } from '../../../../http/errors/throwable-error';
import { Supplier } from '../../../../http/utils/supplier';
import { VerifyClient } from '../resources/verify/client/Client';
import { VerificationsClient } from '../resources/verifications/client/Client';
import { TeamClient } from '../resources/team/client/Client';
import { SmartLookupsClient } from '../resources/smartLookups/client/Client';
import { FlowsClient } from '../resources/flows/client/Client';
import { CoverageClient } from '../resources/coverage/client/Client';
import { AuthenticationClient } from '../resources/authentication/client/Client';
import { ArtefactsClient } from '../resources/artefacts/client/Client';
import { AlertsClient } from '../resources/alerts/client/Client';
import { AdverseMediaClient } from '../resources/adverseMedia/client/Client';
import { OAuthTokenManager } from '../../../../http/oauth/token-manager';

export declare namespace V1Client {
  export type Options = Partial<BaseClientOptions>;
  export interface RequestOptions extends BaseRequestOptions {}
}

/**
 * Client for V1 operations.
 * Provides methods to interact with V1-related API endpoints.
 * All methods return promises and handle request/response serialization automatically.
 */
export class V1Client extends BaseService {
  public readonly verify: VerifyClient;

  public readonly verifications: VerificationsClient;

  public readonly team: TeamClient;

  public readonly smartLookups: SmartLookupsClient;

  public readonly flows: FlowsClient;

  public readonly coverage: CoverageClient;

  public readonly authentication: AuthenticationClient;

  public readonly artefacts: ArtefactsClient;

  public readonly alerts: AlertsClient;

  public readonly adverseMedia: AdverseMediaClient;

  constructor(config: BaseClientOptions, tokenManager: OAuthTokenManager) {
    super(config, tokenManager);
    this.verify = new VerifyClient(config, tokenManager);
    this.verifications = new VerificationsClient(config, tokenManager);
    this.team = new TeamClient(config, tokenManager);
    this.smartLookups = new SmartLookupsClient(config, tokenManager);
    this.flows = new FlowsClient(config, tokenManager);
    this.coverage = new CoverageClient(config, tokenManager);
    this.authentication = new AuthenticationClient(config, tokenManager);
    this.artefacts = new ArtefactsClient(config, tokenManager);
    this.alerts = new AlertsClient(config, tokenManager);
    this.adverseMedia = new AdverseMediaClient(config, tokenManager);
  }
}
