export interface VouchsafeApiEnvironmentUrls {
  v1: string;
  v2: string;
}

export const VouchsafeApiEnvironment = {
  Production: {
    v1: 'https://app.vouchsafe.id/api/v1',
    v2: 'https://app.vouchsafe.id/api/v2',
  },
} as const;

export type VouchsafeApiEnvironment = typeof VouchsafeApiEnvironment.Production;
