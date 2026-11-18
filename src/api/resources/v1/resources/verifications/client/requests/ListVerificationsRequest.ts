import { CaseStatus, caseStatus } from '../../../../types/CaseStatus';

export interface ListVerificationsRequest {
  status?: CaseStatus;
}
