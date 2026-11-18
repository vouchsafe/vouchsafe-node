import * as core from '../../../../core';
import {
  VideoSelfieCheckApi,
  videoSelfieCheckApi,
  videoSelfieCheckApiRequest,
  videoSelfieCheckApiResponse,
} from './VideoSelfieCheckApi';
import {
  VerifyEmailCheckApi,
  verifyEmailCheckApi,
  verifyEmailCheckApiRequest,
  verifyEmailCheckApiResponse,
} from './VerifyEmailCheckApi';
import {
  VerifyPhoneNumberCheckApi,
  verifyPhoneNumberCheckApi,
  verifyPhoneNumberCheckApiRequest,
  verifyPhoneNumberCheckApiResponse,
} from './VerifyPhoneNumberCheckApi';
import {
  ReviewUserCheckApi,
  reviewUserCheckApi,
  reviewUserCheckApiRequest,
  reviewUserCheckApiResponse,
} from './ReviewUserCheckApi';
import {
  PhotoIdEvidenceItemApi,
  photoIdEvidenceItemApi,
  photoIdEvidenceItemApiRequest,
  photoIdEvidenceItemApiResponse,
} from './PhotoIdEvidenceItemApi';
import {
  SupportingDocumentEvidenceItemApi,
  supportingDocumentEvidenceItemApi,
  supportingDocumentEvidenceItemApiRequest,
  supportingDocumentEvidenceItemApiResponse,
} from './SupportingDocumentEvidenceItemApi';
import {
  BankAccountEvidenceItemApi,
  bankAccountEvidenceItemApi,
  bankAccountEvidenceItemApiRequest,
  bankAccountEvidenceItemApiResponse,
} from './BankAccountEvidenceItemApi';
import {
  EvisaEvidenceItemApi,
  evisaEvidenceItemApi,
  evisaEvidenceItemApiRequest,
  evisaEvidenceItemApiResponse,
} from './EvisaEvidenceItemApi';
import {
  RefereeEvidenceItemApi,
  refereeEvidenceItemApi,
  refereeEvidenceItemApiRequest,
  refereeEvidenceItemApiResponse,
} from './RefereeEvidenceItemApi';
import {
  StepIdentityDigitalIdApi,
  stepIdentityDigitalIdApi,
  stepIdentityDigitalIdApiRequest,
  stepIdentityDigitalIdApiResponse,
} from './StepIdentityDigitalIdApi';
import {
  StepIdentityPhotoIdApi,
  stepIdentityPhotoIdApi,
  stepIdentityPhotoIdApiRequest,
  stepIdentityPhotoIdApiResponse,
} from './StepIdentityPhotoIdApi';
import {
  StepIdentityVouchApi,
  stepIdentityVouchApi,
  stepIdentityVouchApiRequest,
  stepIdentityVouchApiResponse,
} from './StepIdentityVouchApi';
import {
  StepAddressDigitalIdApi,
  stepAddressDigitalIdApi,
  stepAddressDigitalIdApiRequest,
  stepAddressDigitalIdApiResponse,
} from './StepAddressDigitalIdApi';
import {
  StepAddressCreditReferenceAgencyApi,
  stepAddressCreditReferenceAgencyApi,
  stepAddressCreditReferenceAgencyApiRequest,
  stepAddressCreditReferenceAgencyApiResponse,
} from './StepAddressCreditReferenceAgencyApi';
import {
  StepAddressSupportingDocumentApi,
  stepAddressSupportingDocumentApi,
  stepAddressSupportingDocumentApiRequest,
  stepAddressSupportingDocumentApiResponse,
} from './StepAddressSupportingDocumentApi';

/**
 * Cast schema for the VerificationCheck model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const verificationCheck = core.cast.identity<VerificationCheck>();

export type VerificationCheck =
  | VideoSelfieCheckApi
  | VerifyEmailCheckApi
  | VerifyPhoneNumberCheckApi
  | ReviewUserCheckApi
  | PhotoIdEvidenceItemApi
  | SupportingDocumentEvidenceItemApi
  | BankAccountEvidenceItemApi
  | EvisaEvidenceItemApi
  | RefereeEvidenceItemApi
  | StepIdentityDigitalIdApi
  | StepIdentityPhotoIdApi
  | StepIdentityVouchApi
  | StepAddressDigitalIdApi
  | StepAddressCreditReferenceAgencyApi
  | StepAddressSupportingDocumentApi;

export const verificationCheckResponse = core.cast.identity<VerificationCheck>();

export const verificationCheckRequest = core.cast.identity<VerificationCheck>();
