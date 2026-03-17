import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../theme/colors';
import { BondInput } from '../types/bond';
import { calculateBondMetrics, formatCurrency, formatPercentage } from '../utils/bondCalculations';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  
  const inputs: BondInput = {
    faceValue: Number(params.faceValue),
    annualCouponRate: Number(params.annualCouponRate),
    marketPrice: Number(params.marketPrice),
    yearsToMaturity: Number(params.yearsToMaturity),
    couponFrequency: (params.couponFrequency as string) === 'semi-annual' ? 'semi-annual' : 'annual',
  };

  const results = calculateBondMetrics(inputs);

  const getPremiumDiscountColor = () => {
    switch (results.premiumDiscount) {
      case 'premium':
        return colors.success;
      case 'discount':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getPremiumDiscountText = () => {
    switch (results.premiumDiscount) {
      case 'premium':
        return 'Premium (Price > Face Value)';
      case 'discount':
        return 'Discount (Price < Face Value)';
      default:
        return 'At Par (Price = Face Value)';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculation Results</Text>
        
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Face Value</Text>
            <Text style={styles.summaryValue}>{formatCurrency(inputs.faceValue)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Market Price</Text>
            <Text style={styles.summaryValue}>{formatCurrency(inputs.marketPrice)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Coupon Rate</Text>
            <Text style={styles.summaryValue}>{inputs.annualCouponRate}%</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Years to Maturity</Text>
            <Text style={styles.summaryValue}>{inputs.yearsToMaturity}</Text>
          </View>
        </View>

        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Yield Metrics</Text>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Annual Coupon</Text>
            <Text style={styles.metricValue}>{formatCurrency(results.annualCoupon)}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Current Yield</Text>
            <Text style={styles.metricValue}>{formatPercentage(results.currentYield)}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Yield to Maturity (YTM)</Text>
            <Text style={styles.metricValue}>{formatPercentage(results.yieldToMaturity)}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Interest Earned</Text>
            <Text style={styles.metricValue}>{formatCurrency(results.totalInterest)}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Bond Status</Text>
            <Text style={[styles.metricValue, { color: getPremiumDiscountColor() }]}>
              {getPremiumDiscountText()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cashFlowButton}
          onPress={() => router.push({ pathname: '/cashflow', params: params as any })}
        >
          <Text style={styles.cashFlowButtonText}>View Cash Flow Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Calculator</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    margin: 20,
    padding: 24,
    backgroundColor: colors.card,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  summarySection: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  resultsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  metricValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  cashFlowButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  cashFlowButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
