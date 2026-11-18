import * as core from '../../../../core';

export const AmlCheckKindApi = {
  AmlSanctions: 'aml_sanctions',
} as const;

export type AmlCheckKindApi = (typeof AmlCheckKindApi)[keyof typeof AmlCheckKindApi];

export const amlCheckKindApi = core.cast.identity<AmlCheckKindApi>();
