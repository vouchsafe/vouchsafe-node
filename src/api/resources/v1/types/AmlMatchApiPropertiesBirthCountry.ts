import * as core from '../../../../core';

/**
 * Cast schema for the AmlMatchApiPropertiesBirthCountry model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const amlMatchApiPropertiesBirthCountry =
  core.cast.identity<AmlMatchApiPropertiesBirthCountry>();

/**
 * Country of birth of the entity.
 */
export type AmlMatchApiPropertiesBirthCountry = string | string[];

export const amlMatchApiPropertiesBirthCountryResponse =
  core.cast.identity<AmlMatchApiPropertiesBirthCountry>();

export const amlMatchApiPropertiesBirthCountryRequest =
  core.cast.identity<AmlMatchApiPropertiesBirthCountry>();
