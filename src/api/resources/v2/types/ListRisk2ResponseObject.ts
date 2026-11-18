import * as core from '../../../../core';

export const ListRisk2ResponseObject = {
  List: 'list',
} as const;

export type ListRisk2ResponseObject =
  (typeof ListRisk2ResponseObject)[keyof typeof ListRisk2ResponseObject];

export const listRisk2ResponseObject = core.cast.identity<ListRisk2ResponseObject>();
