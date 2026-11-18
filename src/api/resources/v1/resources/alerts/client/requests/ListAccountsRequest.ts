import { AlertAccountStatus, alertAccountStatus } from '../../../../types/AlertAccountStatus';

export interface ListAccountsRequest {
  status?: AlertAccountStatus;
  cursor?: string;
}
