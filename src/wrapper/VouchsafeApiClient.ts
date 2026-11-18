import { VouchsafeApiClient as FernClient } from '../Client';

export class VouchsafeApiClient extends FernClient {
  /** The latest API version. Use `.v1` or `.v2` to pin one. */
  public get risk() {
    return this.v2.risk;
  }
}
