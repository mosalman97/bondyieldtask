import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  style,
  textStyle 
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        styles[variant], 
        styles[size],
        style
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText, 
        styles[`${variant}Text`],
        styles[`${size}Text`],
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  small: {
    padding: 12,
  },
  medium: {
    padding: 18,
  },
  large: {
    padding: 24,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  primaryText: {
    color: colors.background,
  },
  secondaryText: {
    color: colors.background,
  },
  outlineText: {
    color: colors.textSecondary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
