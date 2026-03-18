import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface MetricCardProps {
  label: string;
  value: string;
  valueColor?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
}

export function MetricCard({
  label,
  value,
  valueColor,
  style,
  labelStyle,
  valueStyle,
}: MetricCardProps) {
  return (
    <View style={[styles.metricCard, style]}>
      <Text style={[styles.metricLabel, labelStyle]}>{label}</Text>
      <Text style={[
        styles.metricValue, 
        valueColor && { color: valueColor },
        valueStyle
      ]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
