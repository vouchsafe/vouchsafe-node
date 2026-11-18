import * as core from '../../../../core';

export const FlowTemplate = {
  KycAml: 'KYC_AML',
  RightToWork: 'RIGHT_TO_WORK',
  RightToRent: 'RIGHT_TO_RENT',
  DbsCheck: 'DBS_CHECK',
} as const;

export type FlowTemplate = (typeof FlowTemplate)[keyof typeof FlowTemplate];

export const flowTemplate = core.cast.identity<FlowTemplate>();
