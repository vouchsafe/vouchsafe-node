import * as core from '../../../../core';

export const SupportingDocumentEvidenceApi = {
  BirthOrAdoptionCertificate: 'birth_or_adoption_certificate',
  MarriageCertificate: 'marriage_certificate',
  NaturalisationOrRegCertificate: 'naturalisation_or_reg_certificate',
  EducationCertificate: 'education_certificate',
  PayeTaxSummary: 'paye_tax_summary',
  Payslip: 'payslip',
  PensionAnnualStatement: 'pension_annual_statement',
  BenefitsLetter: 'benefits_letter',
  NhsLetter: 'nhs_letter',
  BankStatement: 'bank_statement',
  CreditCardStatement: 'credit_card_statement',
  MortgageStatement: 'mortgage_statement',
  InsurancePolicyAgreement: 'insurance_policy_agreement',
  UtilityBill: 'utility_bill',
  MobilePhoneBill: 'mobile_phone_bill',
  HmppsLetter: 'hmpps_letter',
} as const;

export type SupportingDocumentEvidenceApi =
  (typeof SupportingDocumentEvidenceApi)[keyof typeof SupportingDocumentEvidenceApi];

export const supportingDocumentEvidenceApi = core.cast.identity<SupportingDocumentEvidenceApi>();
