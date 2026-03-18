const ONBOARDING_KEY = 'bond_calculator_onboarding_complete';

// Simple in-memory storage for demo purposes
// In production, you'd want to use SecureStore or AsyncStorage
let storage: { [key: string]: string } = {};

export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    return storage[ONBOARDING_KEY] === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

export async function setOnboardingComplete(): Promise<void> {
  try {
    storage[ONBOARDING_KEY] = 'true';
  } catch (error) {
    console.error('Error setting onboarding complete:', error);
  }
}
