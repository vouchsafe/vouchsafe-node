import * as core from '../../../../core';

/**
 * Cast schema for the AmlMatchApiPropertiesBirthPlace model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const amlMatchApiPropertiesBirthPlace =
  core.cast.identity<AmlMatchApiPropertiesBirthPlace>();

/**
 * Place of birth of the entity.
 */
export type AmlMatchApiPropertiesBirthPlace = string | string[];

export const amlMatchApiPropertiesBirthPlaceResponse =
  core.cast.identity<AmlMatchApiPropertiesBirthPlace>();

export const amlMatchApiPropertiesBirthPlaceRequest =
  core.cast.identity<AmlMatchApiPropertiesBirthPlace>();
