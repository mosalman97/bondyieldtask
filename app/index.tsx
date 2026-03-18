import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { BondInput, FormBondInput, CouponFrequency } from '../types/bond';
import { validateInputs } from '../utils/bondCalculations';
import { ScreenContainer, Card, FormField, FrequencySelector, Button } from '../components';

export default function HomeScreen() {
  const [inputs, setInputs] = useState<FormBondInput>({
    faceValue: '',
    annualCouponRate: '',
    marketPrice: '',
    yearsToMaturity: '',
    couponFrequency: 'annual' as CouponFrequency,
  });

  const handleInputChange = (field: keyof FormBondInput, value: string | CouponFrequency) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const numericInputs: BondInput = {
      ...inputs,
      faceValue: Number(inputs.faceValue),
      annualCouponRate: Number(inputs.annualCouponRate),
      marketPrice: Number(inputs.marketPrice),
      yearsToMaturity: Number(inputs.yearsToMaturity),
    };

    const validation = validateInputs(numericInputs);
    
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.errors.join('\n'));
      return;
    }

    router.push({
      pathname: '/result',
      params: numericInputs as any,
    });
  };

  return (
    <ScreenContainer>
      <Card>
        <Text style={styles.title}>Bond Yield Calculator</Text>
        <Text style={styles.subtitle}>Enter bond details to calculate yields</Text>

        <View style={styles.form}>
          <FormField
            label="Face Value ($)"
            value={inputs.faceValue}
            onChangeText={(value) => handleInputChange('faceValue', value)}
            keyboardType="numeric"
            placeholder="1000"
          />

          <FormField
            label="Annual Coupon Rate (%)"
            value={inputs.annualCouponRate}
            onChangeText={(value) => handleInputChange('annualCouponRate', value)}
            keyboardType="numeric"
            placeholder="5.0"
          />

          <FormField
            label="Market Price ($)"
            value={inputs.marketPrice}
            onChangeText={(value) => handleInputChange('marketPrice', value)}
            keyboardType="numeric"
            placeholder="950"
          />

          <FormField
            label="Years to Maturity"
            value={inputs.yearsToMaturity}
            onChangeText={(value) => handleInputChange('yearsToMaturity', value)}
            keyboardType="numeric"
            placeholder="10"
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Coupon Frequency</Text>
            <FrequencySelector
              value={inputs.couponFrequency}
              onChange={(frequency) => handleInputChange('couponFrequency', frequency)}
            />
          </View>

          <Button
            title="Calculate Yields"
            onPress={handleSubmit}
            style={styles.calculateButton}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  calculateButton: {
    marginTop: 12,
  },
});
