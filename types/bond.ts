export type CouponFrequency = 'annual' | 'semi-annual';

export interface FormBondInput {
  faceValue: string;
  annualCouponRate: string;
  marketPrice: string;
  yearsToMaturity: string;
  couponFrequency: CouponFrequency;
}

export interface BondInput {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

export interface BondCalculation {
  annualCoupon: number;
  currentYield: number;
  yieldToMaturity: number;
  totalInterest: number;
  premiumDiscount: 'premium' | 'discount' | 'at-par';
  couponPerPeriod: number;
  totalPeriods: number;
}

export interface CashFlowItem {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
