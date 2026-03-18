import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../theme/colors';
import { BondInput, CashFlowItem } from '../types/bond';
import { generateCashFlowSchedule, formatCurrency } from '../utils/bondCalculations';
import { ScreenContainer, Card, Button } from '../components';

export default function CashFlowScreen() {
  const params = useLocalSearchParams();
  
  const inputs: BondInput = {
    faceValue: Number(params.faceValue),
    annualCouponRate: Number(params.annualCouponRate),
    marketPrice: Number(params.marketPrice),
    yearsToMaturity: Number(params.yearsToMaturity),
    couponFrequency: (params.couponFrequency as string) === 'semi-annual' ? 'semi-annual' : 'annual',
  };

  const cashFlowSchedule = generateCashFlowSchedule(inputs);

  const renderCashFlowItem = ({ item }: { item: CashFlowItem }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.period}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.paymentDate}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{formatCurrency(item.couponPayment)}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{formatCurrency(item.cumulativeInterest)}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{formatCurrency(item.remainingPrincipal)}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Period</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Payment Date</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Coupon</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Cumulative</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Principal</Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      <Card style={styles.card}>
        <Text style={styles.title}>Cash Flow Schedule</Text>
        
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Bond Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Face Value:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(inputs.faceValue)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Coupon Rate:</Text>
            <Text style={styles.summaryValue}>{inputs.annualCouponRate}%</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frequency:</Text>
            <Text style={styles.summaryValue}>{inputs.couponFrequency === 'annual' ? 'Annual' : 'Semi-Annual'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Periods:</Text>
            <Text style={styles.summaryValue}>{cashFlowSchedule.length}</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          {renderHeader()}
          <FlatList
            data={cashFlowSchedule}
            renderItem={renderCashFlowItem}
            keyExtractor={(item) => item.period.toString()}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Button
          title="Back to Results"
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  summarySection: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
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
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 11,
    color: colors.text,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 10,
  },
});
