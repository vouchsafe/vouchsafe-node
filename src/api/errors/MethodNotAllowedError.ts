import { VouchsafeApiError } from '../../http/errors/throwable-error';
import { RawResponse } from '../../http/utils/fetcher';
import { ApiErrorResponseV2 } from '../resources/v2/types/ApiErrorResponseV2';

export class MethodNotAllowedError extends VouchsafeApiError {
  public declare readonly body: ApiErrorResponseV2;

  constructor(body: ApiErrorResponseV2, rawResponse?: RawResponse) {
    super({ message: 'MethodNotAllowedError', statusCode: 405, body, rawResponse });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'MethodNotAllowedError';
  }
}
