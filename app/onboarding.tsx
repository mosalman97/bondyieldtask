import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer, Card, Button } from '../components';
import { colors } from '../theme/colors';
import { setOnboardingComplete } from '../utils/storage';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to Bond Yield Calculator',
    description: 'Calculate bond yields, current yields, and yield to maturity with our easy-to-use financial calculator.',
    icon: '📊',
  },
  {
    id: '2',
    title: 'Smart Calculations',
    description: 'Get accurate calculations for annual coupons, current yields, and total interest earned on your bonds.',
    icon: '🧮',
  },
  {
    id: '3',
    title: 'Cash Flow Analysis',
    description: 'View detailed cash flow schedules with payment dates and cumulative interest tracking.',
    icon: '💰',
  },
  {
    id: '4',
    title: 'Professional Results',
    description: 'Get comprehensive bond analysis including premium/discount status and yield metrics.',
    icon: '📈',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = async () => {
    await setOnboardingComplete();
    router.replace('/');
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.skipContainer}>
          <Button
            title="Skip"
            onPress={handleSkip}
            variant="outline"
            size="small"
          />
        </View>

        <ScrollView
          style={styles.slidesContainer}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={[styles.slide, { width }]}>
              <Card style={styles.slideCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{slide.icon}</Text>
                </View>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDescription}>{slide.description}</Text>
              </Card>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isLastSlide ? 'Get Started' : 'Next'}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  slidesContainer: {
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideCard: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    fontSize: 60,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  slideDescription: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextButton: {
    marginBottom: 10,
  },
});
