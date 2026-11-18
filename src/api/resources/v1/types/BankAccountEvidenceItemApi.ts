import * as core from '../../../../core';
import {
  BankAccountEvidenceItemApiStep,
  bankAccountEvidenceItemApiStep,
} from './BankAccountEvidenceItemApiStep';
import {
  BankAccountEvidenceItemApiOutcome,
  bankAccountEvidenceItemApiOutcome,
} from './BankAccountEvidenceItemApiOutcome';
import { OpenBankingEvidenceApi, openBankingEvidenceApi } from './OpenBankingEvidenceApi';
import {
  BankAccountDetailsApi,
  bankAccountDetailsApi,
  bankAccountDetailsApiRequest,
  bankAccountDetailsApiResponse,
} from './BankAccountDetailsApi';
import {
  BankAccountValidationsApi,
  bankAccountValidationsApi,
  bankAccountValidationsApiRequest,
  bankAccountValidationsApiResponse,
} from './BankAccountValidationsApi';

export interface BankAccountEvidenceItemApi {
  /** A submitted bank account evidence. */
  step: BankAccountEvidenceItemApiStep;
  /** The overall outcome of the bank account submission. */
  outcome: BankAccountEvidenceItemApiOutcome;
  evidence_type: OpenBankingEvidenceApi;
  /** ISO 8601 timestamp for when this evidence attempt was started. */
  created_at: string;
  extracted_details: BankAccountDetailsApi;
  validations: BankAccountValidationsApi;
}

export namespace BankAccountEvidenceItemApi {
  export type Step = BankAccountEvidenceItemApiStep;
  export const Step = BankAccountEvidenceItemApiStep;
  export type Outcome = BankAccountEvidenceItemApiOutcome;
  export const Outcome = BankAccountEvidenceItemApiOutcome;
}

/**
 * Cast schema for the BankAccountEvidenceItemApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const bankAccountEvidenceItemApi = core.cast.identity<BankAccountEvidenceItemApi>();

/**
 * Cast schema for mapping API responses to the BankAccountEvidenceItemApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const bankAccountEvidenceItemApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'outcome',
      'evidence_type',
      'created_at',
      'extracted_details',
      'validations',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      step: raw['step'],
      outcome: raw['outcome'],
      evidence_type: raw['evidence_type'],
      created_at: raw['created_at'],
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : bankAccountDetailsApiResponse.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : bankAccountValidationsApiResponse.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'evidence_type', 'created_at', 'extracted_details', 'validations'],
);

/**
 * Cast schema for mapping the BankAccountEvidenceItemApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const bankAccountEvidenceItemApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      evidence_type: raw['evidence_type'],
      created_at: raw['created_at'],
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : bankAccountDetailsApiRequest.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : bankAccountValidationsApiRequest.parse(raw['validations']),
    };
  },
  ['step', 'outcome', 'evidence_type', 'created_at', 'extracted_details', 'validations'],
);
