import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { BondInput, FormBondInput, CouponFrequency } from '../types/bond';
import { validateInputs } from '../utils/bondCalculations';

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
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bond Yield Calculator</Text>
        <Text style={styles.subtitle}>Enter bond details to calculate yields</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Face Value ($)</Text>
            <TextInput
              style={styles.input}
              value={inputs.faceValue.toString()}
              onChangeText={(value) => handleInputChange('faceValue', value)}
              keyboardType="numeric"
              placeholder="1000"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Annual Coupon Rate (%)</Text>
            <TextInput
              style={styles.input}
              value={inputs.annualCouponRate.toString()}
              onChangeText={(value) => handleInputChange('annualCouponRate', value)}
              keyboardType="numeric"
              placeholder="5.0"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Market Price ($)</Text>
            <TextInput
              style={styles.input}
              value={inputs.marketPrice.toString()}
              onChangeText={(value) => handleInputChange('marketPrice', value)}
              keyboardType="numeric"
              placeholder="950"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Years to Maturity</Text>
            <TextInput
              style={styles.input}
              value={inputs.yearsToMaturity.toString()}
              onChangeText={(value) => handleInputChange('yearsToMaturity', value)}
              keyboardType="numeric"
              placeholder="10"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Coupon Frequency</Text>
            <View style={styles.frequencyButtons}>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  inputs.couponFrequency === 'annual' && styles.frequencyButtonActive,
                ]}
                onPress={() => handleInputChange('couponFrequency', 'annual')}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    inputs.couponFrequency === 'annual' && styles.frequencyButtonTextActive,
                  ]}
                >
                  Annual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  inputs.couponFrequency === 'semi-annual' && styles.frequencyButtonActive,
                ]}
                onPress={() => handleInputChange('couponFrequency', 'semi-annual')}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    inputs.couponFrequency === 'semi-annual' && styles.frequencyButtonTextActive,
                  ]}
                >
                  Semi-Annual
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={handleSubmit}>
            <Text style={styles.calculateButtonText}>Calculate Yields</Text>
          </TouchableOpacity>
        </View>
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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  frequencyButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  frequencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  frequencyButtonTextActive: {
    color: colors.background,
  },
  calculateButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  calculateButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
