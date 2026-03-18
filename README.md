# Bond Yield Calculator

A production-ready mobile app for calculating bond yields and cash flow schedules using Expo and React Native.

## Features

- **Onboarding Experience**: Interactive introduction to the app's features with swipeable slides
- **Input Form**: Enter bond details including face value, coupon rate, market price, maturity, and frequency
- **Yield Calculations**: Calculate current yield, yield to maturity (YTM), and total interest
- **Premium/Discount Analysis**: Shows if bond is trading at premium, discount, or at par
- **Cash Flow Schedule**: Generate detailed payment schedule with dates and cumulative interest
- **Clean UI**: Modern fintech-style interface with light green theme and reusable components
- **Persistent State**: Remembers onboarding completion for better user experience

## Tech Stack

- **Expo SDK 54** - Latest version
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **React Native** - Cross-platform mobile development

## Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

```bash
# Start the development server
npm start

# Run on specific platforms
npm run android
npm run ios
npm run web
```

## Project Structure

```
bond-yield-calculator/
├── app/                    # App screens and routing
│   ├── _layout.tsx        # Root layout with navigation and onboarding logic
│   ├── index.tsx          # Home screen with input form
│   ├── result.tsx         # Results screen
│   ├── cashflow.tsx       # Cash flow schedule
│   └── onboarding.tsx     # Interactive onboarding screen
├── components/            # Reusable UI components
│   ├── Button.tsx         # Custom button component
│   ├── Card.tsx           # Card container component
│   ├── FormField.tsx      # Input field with label
│   ├── FrequencySelector.tsx # Payment frequency selector
│   ├── MetricCard.tsx     # Display card for metrics
│   ├── ScreenContainer.tsx # Screen wrapper with safe area
│   └── index.ts           # Component exports
├── utils/                  # Utility functions
│   ├── bondCalculations.ts # Bond calculation logic
│   └── storage.ts         # Local storage utilities
├── types/                  # TypeScript type definitions
│   └── bond.ts            # Bond-related types
├── theme/                  # App theming
│   └── colors.ts          # Color scheme
└── Configuration files
    ├── package.json
    ├── app.json
    ├── babel.config.js
    ├── metro.config.js
    ├── tsconfig.json
    └── .gitignore
```

## Calculations

The app uses standard bond calculation formulas:

- **Annual Coupon**: Face Value × Coupon Rate
- **Current Yield**: Annual Coupon / Market Price
- **YTM**: Approximation formula using coupon, face value, market price, and years to maturity
- **Total Interest**: Annual Coupon × Years to Maturity

## Screens

1. **Onboarding Screen** - Interactive introduction with swipeable slides showcasing app features
2. **Home Screen** - Input form for bond parameters
3. **Result Screen** - Displays calculated yields and metrics
4. **Cash Flow Screen** - Shows payment schedule with FlatList table

## Development

This app is built with:
- Strong TypeScript typing
- Separated business logic in utilities
- Clean component architecture with reusable UI components
- Modern React Native patterns
- Expo Router for navigation
- Local storage for user preferences
- Interactive onboarding experience

## License

MIT License
