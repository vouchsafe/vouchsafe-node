import * as core from '../../../../core';

export const SupportingDocumentEvidenceType = {
  Payslip: 'payslip',
  PensionAnnualStatement: 'pension_annual_statement',
  BenefitsLetter: 'benefits_letter',
  HmppsLetter: 'hmpps_letter',
  NhsLetter: 'nhs_letter',
  BankStatement: 'bank_statement',
  CreditCardStatement: 'credit_card_statement',
  MortgageStatement: 'mortgage_statement',
  UtilityBill: 'utility_bill',
  MobilePhoneBill: 'mobile_phone_bill',
  PayeTaxSummary: 'paye_tax_summary',
} as const;

export type SupportingDocumentEvidenceType =
  (typeof SupportingDocumentEvidenceType)[keyof typeof SupportingDocumentEvidenceType];

export const supportingDocumentEvidenceType = core.cast.identity<SupportingDocumentEvidenceType>();
