import { CoverageType, coverageType } from '../../../../types/CoverageType';

export interface ListCoverageRequest {
  country_code?: string;
  type?: CoverageType;
}

