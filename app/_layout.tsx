import { Stack } from 'expo-router';
import { colors } from '../theme/colors';

export default function RootLayout() {
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
    >
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
