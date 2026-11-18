import * as core from '../../../../core';
import {
  StepAddressCreditReferenceAgencyApiStep,
  stepAddressCreditReferenceAgencyApiStep,
} from './StepAddressCreditReferenceAgencyApiStep';
import {
  StepAddressCreditReferenceAgencyApiOutcome,
  stepAddressCreditReferenceAgencyApiOutcome,
} from './StepAddressCreditReferenceAgencyApiOutcome';
import {
  StepAddressCreditReferenceAgencyApiMethod,
  stepAddressCreditReferenceAgencyApiMethod,
} from './StepAddressCreditReferenceAgencyApiMethod';
import {
  StepAddressCreditReferenceAgencyApiExtractedDetails,
  stepAddressCreditReferenceAgencyApiExtractedDetails,
  stepAddressCreditReferenceAgencyApiExtractedDetailsRequest,
  stepAddressCreditReferenceAgencyApiExtractedDetailsResponse,
} from './StepAddressCreditReferenceAgencyApiExtractedDetails';

export interface StepAddressCreditReferenceAgencyApi {
  /** Proof of address. */
  step: StepAddressCreditReferenceAgencyApiStep;
  /** Overall outcome of the address verification. */
  outcome: StepAddressCreditReferenceAgencyApiOutcome;
  /** When the user provided this evidence, in ISO 8601 format. */
  created_at: string;
  /** How the user proved their address. */
  method: StepAddressCreditReferenceAgencyApiMethod;
  /** The name and address checked with the official records. */
  extracted_details: StepAddressCreditReferenceAgencyApiExtractedDetails;
}

export namespace StepAddressCreditReferenceAgencyApi {
  export type Step = StepAddressCreditReferenceAgencyApiStep;
  export const Step = StepAddressCreditReferenceAgencyApiStep;
  export type Outcome = StepAddressCreditReferenceAgencyApiOutcome;
  export const Outcome = StepAddressCreditReferenceAgencyApiOutcome;
  export type Method = StepAddressCreditReferenceAgencyApiMethod;
  export const Method = StepAddressCreditReferenceAgencyApiMethod;
  export interface ExtractedDetails {
    address_source?: StepAddressCreditReferenceAgencyApiExtractedDetails['address_source'];
    address: StepAddressCreditReferenceAgencyApiExtractedDetails['address'];
    postcode: StepAddressCreditReferenceAgencyApiExtractedDetails['postcode'];
    first_line_of_address: StepAddressCreditReferenceAgencyApiExtractedDetails['first_line_of_address'];
    last_name: StepAddressCreditReferenceAgencyApiExtractedDetails['last_name'];
    first_name: StepAddressCreditReferenceAgencyApiExtractedDetails['first_name'];
  }
}

/**
 * Cast schema for the StepAddressCreditReferenceAgencyApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepAddressCreditReferenceAgencyApi =
  core.cast.identity<StepAddressCreditReferenceAgencyApi>();

/**
 * Cast schema for mapping API responses to the StepAddressCreditReferenceAgencyApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepAddressCreditReferenceAgencyApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'step',
      'outcome',
      'created_at',
      'method',
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
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : stepAddressCreditReferenceAgencyApiExtractedDetailsResponse.parse(
              raw['extracted_details'],
            ),
    };
  },
  ['step', 'outcome', 'created_at', 'method', 'extracted_details'],
);

/**
 * Cast schema for mapping the StepAddressCreditReferenceAgencyApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepAddressCreditReferenceAgencyApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      step: raw['step'],
      outcome: raw['outcome'],
      created_at: raw['created_at'],
      method: raw['method'],
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : stepAddressCreditReferenceAgencyApiExtractedDetailsRequest.parse(
              raw['extracted_details'],
            ),
    };
  },
  ['step', 'outcome', 'created_at', 'method', 'extracted_details'],
);
