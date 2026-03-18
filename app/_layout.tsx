import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { colors } from '../theme/colors';
import { hasSeenOnboarding } from '../utils/storage';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboardingScreen, setHasSeenOnboardingScreen] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasSeen = await hasSeenOnboarding();
      setHasSeenOnboardingScreen(hasSeen);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setHasSeenOnboardingScreen(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={hasSeenOnboardingScreen ? 'index' : 'onboarding'}
    >
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: 'Bond Yield Calculator',
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: 'Calculation Results',
        }}
      />
      <Stack.Screen
        name="cashflow"
        options={{
          title: 'Cash Flow Schedule',
        }}
      />
    </Stack>
  );
}
