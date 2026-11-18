import * as core from '../../../../core';

export const TeamPlan = {
  Trial: 'Trial',
  Payg: 'PAYG',
  Lite: 'Lite',
  Flex: 'Flex',
  Enterprise: 'Enterprise',
} as const;

export type TeamPlan = (typeof TeamPlan)[keyof typeof TeamPlan];

export const teamPlan = core.cast.identity<TeamPlan>();
