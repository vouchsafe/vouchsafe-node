import * as core from '../../../../core';
import {
  AmlMatchApiPropertiesBirthCountry,
  amlMatchApiPropertiesBirthCountry,
  amlMatchApiPropertiesBirthCountryRequest,
  amlMatchApiPropertiesBirthCountryResponse,
} from './AmlMatchApiPropertiesBirthCountry';
import {
  AmlMatchApiPropertiesBirthPlace,
  amlMatchApiPropertiesBirthPlace,
  amlMatchApiPropertiesBirthPlaceRequest,
  amlMatchApiPropertiesBirthPlaceResponse,
} from './AmlMatchApiPropertiesBirthPlace';
import {
  AmlMatchApiPropertiesPosition,
  amlMatchApiPropertiesPosition,
  amlMatchApiPropertiesPositionRequest,
  amlMatchApiPropertiesPositionResponse,
} from './AmlMatchApiPropertiesPosition';
import {
  AmlMatchApiPropertiesCountry,
  amlMatchApiPropertiesCountry,
  amlMatchApiPropertiesCountryRequest,
  amlMatchApiPropertiesCountryResponse,
} from './AmlMatchApiPropertiesCountry';
import {
  AmlMatchApiPropertiesNotes,
  amlMatchApiPropertiesNotes,
  amlMatchApiPropertiesNotesRequest,
  amlMatchApiPropertiesNotesResponse,
} from './AmlMatchApiPropertiesNotes';

export interface AmlMatchApiProperties {
  /** Country of birth of the entity. */
  birth_country: AmlMatchApiPropertiesBirthCountry;
  /** Place of birth of the entity. */
  birth_place: AmlMatchApiPropertiesBirthPlace;
  /** Date of birth of the entity. */
  birth_date: string;
  /** Known positions or roles held by the entity. */
  position: AmlMatchApiPropertiesPosition;
  /** Countries associated with the entity. */
  country: AmlMatchApiPropertiesCountry;
  /** Freeform notes associated with the entity. */
  notes: AmlMatchApiPropertiesNotes;
}

export namespace AmlMatchApiProperties {
  export type BirthCountry = AmlMatchApiPropertiesBirthCountry;
  export type BirthPlace = AmlMatchApiPropertiesBirthPlace;
  export type Position = AmlMatchApiPropertiesPosition;
  export type Country = AmlMatchApiPropertiesCountry;
  export type Notes = AmlMatchApiPropertiesNotes;
}

/**
 * Cast schema for the AmlMatchApiProperties model — a bare identity (see cast.ts): this
 * export is never itself used for wire<->app rename, only referenced by name from other files.
 */
export const amlMatchApiProperties = core.cast.identity<AmlMatchApiProperties>();

/**
 * Cast schema for mapping API responses to the AmlMatchApiProperties application shape.
 * Renames wire keys to idiomatic property names; performs no validation (see cast.ts).
 */
export const amlMatchApiPropertiesResponse = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    const __declaredKeys = new Set<string>([
      'birth_country',
      'birth_place',
      'birth_date',
      'position',
      'country',
      'notes',
    ]);
    const __extras: { [key: string]: unknown } = {};
    for (const __key of globalThis.Object.keys(raw as object)) {
      if (!__declaredKeys.has(__key)) {
        __extras[__key] = (raw as { [key: string]: unknown })[__key];
      }
    }
    return {
      ...__extras,
      birth_country: raw['birth_country'],
      birth_place: raw['birth_place'],
      birth_date: raw['birth_date'],
      position: raw['position'],
      country: raw['country'],
      notes: raw['notes'],
    };
  },
  ['birth_country', 'birth_place', 'birth_date', 'position', 'country', 'notes'],
);

/**
 * Cast schema for mapping the AmlMatchApiProperties application shape to API requests.
 * Renames idiomatic property names back to wire keys; performs no validation (see cast.ts).
 */
export const amlMatchApiPropertiesRequest = core.cast.object(
  (raw: any): any => {
    if (raw === null || raw === undefined) {
      return raw;
    }
    return {
      birth_country: raw['birth_country'],
      birth_place: raw['birth_place'],
      birth_date: raw['birth_date'],
      position: raw['position'],
      country: raw['country'],
      notes: raw['notes'],
    };
  },
  ['birth_country', 'birth_place', 'birth_date', 'position', 'country', 'notes'],
);
