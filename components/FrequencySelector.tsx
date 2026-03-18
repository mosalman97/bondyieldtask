import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { CouponFrequency } from '../types/bond';

interface FrequencySelectorProps {
  value: CouponFrequency;
  onChange: (frequency: CouponFrequency) => void;
}

export function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  return (
    <View style={styles.frequencyButtons}>
      <TouchableOpacity
        style={[
          styles.frequencyButton,
          value === 'annual' && styles.frequencyButtonActive,
        ]}
        onPress={() => onChange('annual')}
      >
        <Text
          style={[
            styles.frequencyButtonText,
            value === 'annual' && styles.frequencyButtonTextActive,
          ]}
        >
          Annual
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.frequencyButton,
          value === 'semi-annual' && styles.frequencyButtonActive,
        ]}
        onPress={() => onChange('semi-annual')}
      >
        <Text
          style={[
            styles.frequencyButtonText,
            value === 'semi-annual' && styles.frequencyButtonTextActive,
          ]}
        >
          Semi-Annual
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
