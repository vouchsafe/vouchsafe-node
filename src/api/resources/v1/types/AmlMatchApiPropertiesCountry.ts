import * as core from '../../../../core';

/**
 * Cast schema for the AmlMatchApiPropertiesCountry model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const amlMatchApiPropertiesCountry = core.cast.identity<AmlMatchApiPropertiesCountry>();

/**
 * Countries associated with the entity.
 */
export type AmlMatchApiPropertiesCountry = string | string[];

export const amlMatchApiPropertiesCountryResponse =
  core.cast.identity<AmlMatchApiPropertiesCountry>();

export const amlMatchApiPropertiesCountryRequest =
  core.cast.identity<AmlMatchApiPropertiesCountry>();
