import * as core from '../../../../core';
import {
  PhotoIdValidationsApi,
  photoIdValidationsApi,
  photoIdValidationsApiRequest,
  photoIdValidationsApiResponse,
} from './PhotoIdValidationsApi';
import {
  RecordStringNever,
  recordStringNever,
  recordStringNeverRequest,
  recordStringNeverResponse,
} from './RecordStringNever';

/**
 * Cast schema for the StepIdentityPhotoIdApiValidations model — a bare identity (see cast.ts): no
 * rename is ever needed on a union/complex model across the real serde-off roster.
 */
export const stepIdentityPhotoIdApiValidations =
  core.cast.identity<StepIdentityPhotoIdApiValidations>();

/**
 * Each check run on the document, and whether it passed. Empty while `outcome` is `in_progress`.
 */
export type StepIdentityPhotoIdApiValidations = PhotoIdValidationsApi | RecordStringNever;

export const stepIdentityPhotoIdApiValidationsResponse =
  core.cast.identity<StepIdentityPhotoIdApiValidations>();

export const stepIdentityPhotoIdApiValidationsRequest =
  core.cast.identity<StepIdentityPhotoIdApiValidations>();
