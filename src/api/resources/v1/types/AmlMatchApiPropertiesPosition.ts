import * as core from '../../../../core';

/**
 * Cast schema for the AmlMatchApiPropertiesPosition model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const amlMatchApiPropertiesPosition = core.cast.identity<AmlMatchApiPropertiesPosition>();

/**
 * Known positions or roles held by the entity.
 */
export type AmlMatchApiPropertiesPosition = string | string[];

export const amlMatchApiPropertiesPositionResponse =
  core.cast.identity<AmlMatchApiPropertiesPosition>();

export const amlMatchApiPropertiesPositionRequest =
  core.cast.identity<AmlMatchApiPropertiesPosition>();
