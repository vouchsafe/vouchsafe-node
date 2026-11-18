import * as core from '../../../../core';

export const GetTeamResponsePlan = {
  Trial: 'Trial',
  Payg: 'PAYG',
  Lite: 'Lite',
  Flex: 'Flex',
  Enterprise: 'Enterprise',
} as const;

export type GetTeamResponsePlan = (typeof GetTeamResponsePlan)[keyof typeof GetTeamResponsePlan];

export const getTeamResponsePlan = core.cast.identity<GetTeamResponsePlan>();
