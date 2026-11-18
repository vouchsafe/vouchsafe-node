import * as core from '../../../../core';
import {
  AmlMatchApiProperties,
  amlMatchApiProperties,
  amlMatchApiPropertiesRequest,
  amlMatchApiPropertiesResponse,
} from './AmlMatchApiProperties';
import { AmlMatchApiPropertiesBirthCountry } from './AmlMatchApiPropertiesBirthCountry';
import { AmlMatchApiPropertiesBirthPlace } from './AmlMatchApiPropertiesBirthPlace';
import { AmlMatchApiPropertiesPosition } from './AmlMatchApiPropertiesPosition';
import { AmlMatchApiPropertiesCountry } from './AmlMatchApiPropertiesCountry';
import { AmlMatchApiPropertiesNotes } from './AmlMatchApiPropertiesNotes';

export interface AmlMatchApi {
  /** Unique identifier for the matched entity. */
  id: string;
  /** Display name of the matched entity. */
  caption: string;
  /** Similarity score for this match. */
  score: number;
  /** ISO 8601 date when the entity was first seen in the sanctions list. */
  first_seen?: string;
  /** ISO 8601 date when the entity was last seen in the sanctions list. */
  last_seen?: string;
  properties: AmlMatchApiProperties;
}

export namespace AmlMatchApi {
  export interface Properties {
    birth_country: AmlMatchApiProperties['birth_country'];
    birth_place: AmlMatchApiProperties['birth_place'];
    birth_date: AmlMatchApiProperties['birth_date'];
    position: AmlMatchApiProperties['position'];
    country: AmlMatchApiProperties['country'];
    notes: AmlMatchApiProperties['notes'];
  }
  export namespace Properties {
    export type BirthCountry = AmlMatchApiPropertiesBirthCountry;
    export type BirthPlace = AmlMatchApiPropertiesBirthPlace;
    export type Position = AmlMatchApiPropertiesPosition;
    export type Country = AmlMatchApiPropertiesCountry;
    export type Notes = AmlMatchApiPropertiesNotes;
  }
}

/**
 * Cast schema for the AmlMatchApi model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlMatchApi = core.cast.identity<AmlMatchApi>();

/**
 * Cast schema for mapping API responses to the AmlMatchApi application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlMatchApiResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'id',
      'caption',
      'score',
      'first_seen',
      'last_seen',
      'properties',
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
      caption: raw['caption'],
      score: raw['score'],
      first_seen: raw['first_seen'],
      last_seen: raw['last_seen'],
      properties:
        raw['properties'] == null
          ? raw['properties']
          : amlMatchApiPropertiesResponse.parse(raw['properties']),
    };
  },
  ['id', 'caption', 'score', 'properties'],
);

/**
 * Cast schema for mapping the AmlMatchApi application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlMatchApiRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      id: raw['id'],
      caption: raw['caption'],
      score: raw['score'],
      first_seen: raw['first_seen'],
      last_seen: raw['last_seen'],
      properties:
        raw['properties'] == null
          ? raw['properties']
          : amlMatchApiPropertiesRequest.parse(raw['properties']),
    };
  },
  ['id', 'caption', 'score', 'properties'],
);
