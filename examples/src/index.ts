import { VouchsafeApiClient } from '@vouchsafe/node';

(async () => {
  const client = new VouchsafeApiClient({ clientId: 'CLIENT_ID', clientSecret: 'CLIENT_SECRET' });
  await client.v1.verifications.list({
    status: 'InProgress',
  });
})();
