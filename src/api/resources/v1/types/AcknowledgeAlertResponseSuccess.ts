import * as core from '../../../../core';

export const acknowledgeAlertResponseSuccess =
  core.cast.identity<AcknowledgeAlertResponseSuccess>();

export type AcknowledgeAlertResponseSuccess = true;
