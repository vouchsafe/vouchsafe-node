import * as core from '../../../../core';
import {
  StepAddressDigitalIdApiStep,
  stepAddressDigitalIdApiStep,
} from './StepAddressDigitalIdApiStep';
import {
  StepAddressDigitalIdApiOutcome,
  stepAddressDigitalIdApiOutcome,
} from './StepAddressDigitalIdApiOutcome';
import {
  StepAddressDigitalIdApiMethod,
  stepAddressDigitalIdApiMethod,
} from './StepAddressDigitalIdApiMethod';
import {
  DigitalIdVerificationMethodApi,
  digitalIdVerificationMethodApi,
} from './DigitalIdVerificationMethodApi';
import {
  StepAddressDigitalIdApiExtractedDetails,
  stepAddressDigitalIdApiExtractedDetails,
  stepAddressDigitalIdApiExtractedDetailsRequest,
  stepAddressDigitalIdApiExtractedDetailsResponse,
} from './StepAddressDigitalIdApiExtractedDetails';

export interface StepAddressDigitalIdApi {
  /** Proof of address. */
  step: StepAddressDigitalIdApiStep;
  /** Overall outcome of the address verification. */
  outcome: StepAddressDigitalIdApiOutcome;
  /** When the user provided this evidence, in ISO 8601 format. */
  created_at: string;
  /** How the user proved their address. */
  method: StepAddressDigitalIdApiMethod;
  evidence_type: DigitalIdVerificationMethodApi;
  /** The address returned by the provider. */
  extracted_details: StepAddressDigitalIdApiExtractedDetails;
}

export namespace StepAddressDigitalIdApi {
  export type Step = StepAddressDigitalIdApiStep;
  export const Step = StepAddressDigitalIdApiStep;
  export type Outcome = StepAddressDigitalIdApiOutcome;
  export const Outcome = StepAddressDigitalIdApiOutcome;
  export type Method = StepAddressDigitalIdApiMethod;
  export const Method = StepAddressDigitalIdApiMethod;
  export interface ExtractedDetails {
    address: StepAddressDigitalIdApiExtractedDetails['address'];
    postcode: StepAddressDigitalIdApiExtractedDetails['postcode'];
    first_line_of_address: StepAddressDigitalIdApiExtractedDetails['first_line_of_address'];
  }
}

/**
 * Cast schema for the StepAddressDigitalIdApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepAddressDigitalIdApi = core.cast.identity<StepAddressDigitalIdApi>();

/**
 * Cast schema for mapping API responses to the StepAddressDigitalIdApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepAddressDigitalIdApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'outcome',
      'created_at',
      'method',
      'evidence_type',
      'extracted_details',
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
      created_at: raw['created_at'],
      method: raw['method'],
      evidence_type: raw['evidence_type'],
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : stepAddressDigitalIdApiExtractedDetailsResponse.parse(raw['extracted_details']),
    };
  },
  ['step', 'outcome', 'created_at', 'method', 'evidence_type', 'extracted_details'],
);

/**
 * Cast schema for mapping the StepAddressDigitalIdApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepAddressDigitalIdApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      created_at: raw['created_at'],
      method: raw['method'],
      evidence_type: raw['evidence_type'],
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : stepAddressDigitalIdApiExtractedDetailsRequest.parse(raw['extracted_details']),
    };
  },
  ['step', 'outcome', 'created_at', 'method', 'evidence_type', 'extracted_details'],
);
