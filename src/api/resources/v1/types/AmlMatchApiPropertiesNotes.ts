import * as core from '../../../../core';

/**
 * Cast schema for the AmlMatchApiPropertiesNotes model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const amlMatchApiPropertiesNotes = core.cast.identity<AmlMatchApiPropertiesNotes>();

/**
 * Freeform notes associated with the entity.
 */
export type AmlMatchApiPropertiesNotes = string | string[];

export const amlMatchApiPropertiesNotesResponse = core.cast.identity<AmlMatchApiPropertiesNotes>();

export const amlMatchApiPropertiesNotesRequest = core.cast.identity<AmlMatchApiPropertiesNotes>();
