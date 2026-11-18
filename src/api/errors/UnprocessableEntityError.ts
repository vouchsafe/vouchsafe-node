import { VouchsafeApiError } from '../../http/errors/throwable-error';
import { RawResponse } from '../../http/utils/fetcher';

export class UnprocessableEntityError extends VouchsafeApiError {
  constructor(body?: unknown, rawResponse?: RawResponse) {
    super({ message: 'UnprocessableEntityError', statusCode: 422, body, rawResponse });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'UnprocessableEntityError';
  }
}
