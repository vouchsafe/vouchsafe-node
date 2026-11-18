import * as core from '../../../../core';
import {
  DatasetReference,
  datasetReference,
  datasetReferenceRequest,
  datasetReferenceResponse,
} from './DatasetReference';

export interface AlertMatchResponse {
  id: string;
  opensanctions_id: string | null;
  caption: string;
  entity_type: string;
  datasets: DatasetReference[];
  score: number;
}

/**
 * Cast schema for the AlertMatchResponse model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const alertMatchResponse = core.cast.identity<AlertMatchResponse>();

/**
 * Cast schema for mapping API responses to the AlertMatchResponse application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const alertMatchResponseResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'opensanctions_id',
      'caption',
      'entity_type',
      'datasets',
      'score',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      id: raw['id'],
      opensanctions_id: raw['opensanctions_id'],
      caption: raw['caption'],
      entity_type: raw['entity_type'],
      datasets: Array.isArray(raw['datasets'])
        ? (raw['datasets'] as any[]).map((v: any) =>
            v == null ? v : datasetReferenceResponse.parse(v),
          )
        : (raw['datasets'] as any),
      score: raw['score'],
    };
  },
  ['id', 'opensanctions_id', 'caption', 'entity_type', 'datasets', 'score'],
);

/**
 * Cast schema for mapping the AlertMatchResponse application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const alertMatchResponseRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      opensanctions_id: raw['opensanctions_id'],
      caption: raw['caption'],
      entity_type: raw['entity_type'],
      datasets: Array.isArray(raw['datasets'])
        ? (raw['datasets'] as any[]).map((v: any) =>
            v == null ? v : datasetReferenceRequest.parse(v),
          )
        : (raw['datasets'] as any),
      score: raw['score'],
    };
  },
  ['id', 'opensanctions_id', 'caption', 'entity_type', 'datasets', 'score'],
);
