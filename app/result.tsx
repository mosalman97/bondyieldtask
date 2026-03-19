import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../theme/colors';
import { BondInput } from '../types/bond';
import { calculateBondMetrics, formatCurrency, formatPercentage } from '../utils/bondCalculations';
import { ScreenContainer, Card, MetricCard, Button } from '../components';

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
    <ScreenContainer>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>Calculation Results</Text>
          
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Bond Summary</Text>
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
            
            <MetricCard
              label="Annual Coupon"
              value={formatCurrency(results.annualCoupon)}
            />

            <MetricCard
              label="Current Yield"
              value={formatPercentage(results.currentYield)}
            />

            <MetricCard
              label="Yield to Maturity (YTM)"
              value={formatPercentage(results.yieldToMaturity)}
            />

            <MetricCard
              label="Total Interest Earned"
              value={formatCurrency(results.totalInterest)}
            />

            <MetricCard
              label="Bond Status"
              value={getPremiumDiscountText()}
              valueColor={getPremiumDiscountColor()}
            />
          </View>

          <Button
            title="View Cash Flow Schedule"
            onPress={() => router.push({ pathname: '/cashflow', params: params as any })}
            style={styles.cashFlowButton}
          />

          <Button
            title="Back to Calculator"
            onPress={() => router.back()}
            variant="outline"
            style={styles.backButton}
          />
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
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
  cashFlowButton: {
    marginBottom: 12,
  },
  backButton: {
    marginBottom: 10,
  },
});
