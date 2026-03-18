import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export function ScreenContainer({ children, scrollable = true, style }: ScreenContainerProps) {
  const Container = scrollable ? ScrollView : View;
  
  return (
    <Container style={[styles.container, style]}>
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
