import { VouchsafeApiClient as FernClient } from '../Client';

/** The Venne API, e.g. `venne.risk.checkLegacy()`. Pin v1 with `venne.v1`. */
export class Venne extends FernClient {}

/** @deprecated Use `Venne` */
export class VouchsafeApiClient extends Venne {}
