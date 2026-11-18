import * as core from '../../../../core';
import {
  StepAddressSupportingDocumentApiStep,
  stepAddressSupportingDocumentApiStep,
} from './StepAddressSupportingDocumentApiStep';
import {
  StepAddressSupportingDocumentApiOutcome,
  stepAddressSupportingDocumentApiOutcome,
} from './StepAddressSupportingDocumentApiOutcome';
import {
  StepAddressSupportingDocumentApiMethod,
  stepAddressSupportingDocumentApiMethod,
} from './StepAddressSupportingDocumentApiMethod';
import {
  SupportingDocumentEvidenceApi,
  supportingDocumentEvidenceApi,
} from './SupportingDocumentEvidenceApi';
import { ArtefactApi, artefactApi, artefactApiRequest, artefactApiResponse } from './ArtefactApi';
import {
  SupportingDocumentDetailsApi,
  supportingDocumentDetailsApi,
  supportingDocumentDetailsApiRequest,
  supportingDocumentDetailsApiResponse,
} from './SupportingDocumentDetailsApi';
import {
  SupportingDocumentValidationsApi,
  supportingDocumentValidationsApi,
  supportingDocumentValidationsApiRequest,
  supportingDocumentValidationsApiResponse,
} from './SupportingDocumentValidationsApi';

export interface StepAddressSupportingDocumentApi {
  /** Proof of address. */
  step: StepAddressSupportingDocumentApiStep;
  /** Overall outcome of the address verification. */
  outcome: StepAddressSupportingDocumentApiOutcome;
  /** When the user provided this evidence, in ISO 8601 format. */
  created_at: string;
  /** How the user proved their address. */
  method: StepAddressSupportingDocumentApiMethod;
  evidence_type: SupportingDocumentEvidenceApi;
  /** The files collected, such as document images. Download each one using its `key`. */
  artefacts: ArtefactApi[];
  extracted_details: SupportingDocumentDetailsApi;
  validations: SupportingDocumentValidationsApi;
}

export namespace StepAddressSupportingDocumentApi {
  export type Step = StepAddressSupportingDocumentApiStep;
  export const Step = StepAddressSupportingDocumentApiStep;
  export type Outcome = StepAddressSupportingDocumentApiOutcome;
  export const Outcome = StepAddressSupportingDocumentApiOutcome;
  export type Method = StepAddressSupportingDocumentApiMethod;
  export const Method = StepAddressSupportingDocumentApiMethod;
}

/**
 * Cast schema for the StepAddressSupportingDocumentApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const stepAddressSupportingDocumentApi =
  core.cast.identity<StepAddressSupportingDocumentApi>();

/**
 * Cast schema for mapping API responses to the StepAddressSupportingDocumentApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const stepAddressSupportingDocumentApiResponse = core.cast.object(
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
      'artefacts',
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
      created_at: raw['created_at'],
      method: raw['method'],
      evidence_type: raw['evidence_type'],
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) =>
            v == null ? v : artefactApiResponse.parse(v),
          )
        : (raw['artefacts'] as any),
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : supportingDocumentDetailsApiResponse.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : supportingDocumentValidationsApiResponse.parse(raw['validations']),
    };
  },
  [
    'step',
    'outcome',
    'created_at',
    'method',
    'evidence_type',
    'artefacts',
    'extracted_details',
    'validations',
  ],
);

/**
 * Cast schema for mapping the StepAddressSupportingDocumentApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const stepAddressSupportingDocumentApiRequest = core.cast.object(
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
      artefacts: Array.isArray(raw['artefacts'])
        ? (raw['artefacts'] as any[]).map((v: any) => (v == null ? v : artefactApiRequest.parse(v)))
        : (raw['artefacts'] as any),
      extracted_details:
        raw['extracted_details'] == null
          ? raw['extracted_details']
          : supportingDocumentDetailsApiRequest.parse(raw['extracted_details']),
      validations:
        raw['validations'] == null
          ? raw['validations']
          : supportingDocumentValidationsApiRequest.parse(raw['validations']),
    };
  },
  [
    'step',
    'outcome',
    'created_at',
    'method',
    'evidence_type',
    'artefacts',
    'extracted_details',
    'validations',
  ],
);
