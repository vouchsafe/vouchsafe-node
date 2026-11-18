import { VouchsafeApiError } from '../../http/errors/throwable-error';
import { RawResponse } from '../../http/utils/fetcher';
import { ApiErrorResponse } from '../resources/v1/types/ApiErrorResponse';

export class NotImplementedError extends VouchsafeApiError {
  public declare readonly body: ApiErrorResponse;

  constructor(body: ApiErrorResponse, rawResponse?: RawResponse) {
    super({ message: 'NotImplementedError', statusCode: 501, body, rawResponse });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'NotImplementedError';
  }
}
