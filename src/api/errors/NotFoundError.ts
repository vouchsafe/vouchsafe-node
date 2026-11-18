import { VouchsafeApiError } from '../../http/errors/throwable-error';
import { RawResponse } from '../../http/utils/fetcher';
import { ApiErrorResponse } from '../resources/v1/types/ApiErrorResponse';

export class NotFoundError extends VouchsafeApiError {
  public declare readonly body: ApiErrorResponse;

  constructor(body: ApiErrorResponse, rawResponse?: RawResponse) {
    super({ message: 'NotFoundError', statusCode: 404, body, rawResponse });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'NotFoundError';
  }
}
