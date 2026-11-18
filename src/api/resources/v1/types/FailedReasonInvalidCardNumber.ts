import * as core from '../../../../core';

export const FailedReasonInvalidCardNumber = {
  InvalidCardNumber: 'INVALID_CARD_NUMBER',
} as const;

export type FailedReasonInvalidCardNumber =
  (typeof FailedReasonInvalidCardNumber)[keyof typeof FailedReasonInvalidCardNumber];

export const failedReasonInvalidCardNumber = core.cast.identity<FailedReasonInvalidCardNumber>();
