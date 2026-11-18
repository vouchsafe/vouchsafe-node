import * as core from '../../../../core';
import {
  BankAccountDetailsApiAccountType,
  bankAccountDetailsApiAccountType,
} from './BankAccountDetailsApiAccountType';
import {
  TransactionDataApi,
  transactionDataApi,
  transactionDataApiRequest,
  transactionDataApiResponse,
} from './TransactionDataApi';

export interface BankAccountDetailsApi {
  /** First name, if extracted. Otherwise null. */
  first_name: string | null;
  /** Last name, if extracted. Otherwise null. */
  last_name: string | null;
  /** Bank name, if available. Otherwise null. */
  bank_name: string | null;
  /** Account type, if available. Otherwise null. */
  account_type: BankAccountDetailsApiAccountType | null;
  transaction_data: TransactionDataApi | null;
}

export namespace BankAccountDetailsApi {
  export type AccountType = BankAccountDetailsApiAccountType;
  export const AccountType = BankAccountDetailsApiAccountType;
}

/**
 * Cast schema for the BankAccountDetailsApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const bankAccountDetailsApi = core.cast.identity<BankAccountDetailsApi>();

/**
 * Cast schema for mapping API responses to the BankAccountDetailsApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const bankAccountDetailsApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'first_name',
      'last_name',
      'bank_name',
      'account_type',
      'transaction_data',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      bank_name: raw['bank_name'],
      account_type: raw['account_type'],
      transaction_data:
        raw['transaction_data'] == null
          ? raw['transaction_data']
          : transactionDataApiResponse.parse(raw['transaction_data']),
    };
  },
  ['first_name', 'last_name', 'bank_name', 'account_type', 'transaction_data'],
);

/**
 * Cast schema for mapping the BankAccountDetailsApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const bankAccountDetailsApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      first_name: raw['first_name'],
      last_name: raw['last_name'],
      bank_name: raw['bank_name'],
      account_type: raw['account_type'],
      transaction_data:
        raw['transaction_data'] == null
          ? raw['transaction_data']
          : transactionDataApiRequest.parse(raw['transaction_data']),
    };
  },
  ['first_name', 'last_name', 'bank_name', 'account_type', 'transaction_data'],
);
