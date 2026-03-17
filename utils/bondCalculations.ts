import { BondInput, BondCalculation, CashFlowItem, ValidationResult, CouponFrequency } from '../types/bond';

export function validateInputs(inputs: BondInput): ValidationResult {
  const errors: string[] = [];

  if (inputs.faceValue <= 0) {
    errors.push('Face Value must be greater than 0');
  }

  if (inputs.annualCouponRate < 0 || inputs.annualCouponRate > 100) {
    errors.push('Annual Coupon Rate must be between 0 and 100');
  }

  if (inputs.marketPrice <= 0) {
    errors.push('Market Price must be greater than 0');
  }

  if (inputs.yearsToMaturity <= 0) {
    errors.push('Years to Maturity must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function calculateBondMetrics(inputs: BondInput): BondCalculation {
  const { faceValue, annualCouponRate, marketPrice, yearsToMaturity, couponFrequency } = inputs;

  const annualCoupon = faceValue * (annualCouponRate / 100);
  const currentYield = annualCoupon / marketPrice;
  
  const n = yearsToMaturity;
  const C = annualCoupon;
  const F = faceValue;
  const P = marketPrice;
  
  const yieldToMaturity = (C + (F - P) / n) / ((F + P) / 2);
  
  const totalInterest = C * n;
  
  let premiumDiscount: 'premium' | 'discount' | 'at-par';
  if (marketPrice > faceValue) {
    premiumDiscount = 'premium';
  } else if (marketPrice < faceValue) {
    premiumDiscount = 'discount';
  } else {
    premiumDiscount = 'at-par';
  }

  const frequency = couponFrequency === 'annual' ? 1 : 2;
  const couponPerPeriod = annualCoupon / frequency;
  const totalPeriods = yearsToMaturity * frequency;

  return {
    annualCoupon,
    currentYield,
    yieldToMaturity,
    totalInterest,
    premiumDiscount,
    couponPerPeriod,
    totalPeriods
  };
}

export function generateCashFlowSchedule(inputs: BondInput): CashFlowItem[] {
  const calculation = calculateBondMetrics(inputs);
  const { couponPerPeriod, totalPeriods } = calculation;
  const { faceValue, yearsToMaturity, couponFrequency } = inputs;

  const schedule: CashFlowItem[] = [];
  let cumulativeInterest = 0;

  const frequency = couponFrequency === 'annual' ? 1 : 2;
  const startDate = new Date();

  for (let period = 1; period <= totalPeriods; period++) {
    cumulativeInterest += couponPerPeriod;
    
    const monthsToAdd = 12 / frequency;
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(startDate.getMonth() + (period * monthsToAdd));

    let remainingPrincipal = faceValue;
    if (period === totalPeriods) {
      remainingPrincipal = 0;
    }

    schedule.push({
      period,
      paymentDate: paymentDate.toLocaleDateString(),
      couponPayment: couponPerPeriod,
      cumulativeInterest,
      remainingPrincipal
    });
  }

  return schedule;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}
