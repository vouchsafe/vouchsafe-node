import { VouchsafeApiError } from '../../http/errors/throwable-error';
import { RawResponse } from '../../http/utils/fetcher';

export class UnauthorizedError extends VouchsafeApiError {
  constructor(body?: unknown, rawResponse?: RawResponse) {
    super({ message: 'UnauthorizedError', statusCode: 401, body, rawResponse });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'UnauthorizedError';
  }
}
