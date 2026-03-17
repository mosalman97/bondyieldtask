# Bond Yield Calculator

A production-ready mobile app for calculating bond yields and cash flow schedules using Expo and React Native.

## Features

- **Input Form**: Enter bond details including face value, coupon rate, market price, maturity, and frequency
- **Yield Calculations**: Calculate current yield, yield to maturity (YTM), and total interest
- **Premium/Discount Analysis**: Shows if bond is trading at premium, discount, or at par
- **Cash Flow Schedule**: Generate detailed payment schedule with dates and cumulative interest
- **Clean UI**: Modern fintech-style interface with light green theme

## Tech Stack

- **Expo SDK 51** - Latest version
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
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Home screen with input form
│   ├── result.tsx         # Results screen
│   └── cashflow.tsx       # Cash flow schedule
├── components/            # Reusable components (empty)
├── utils/                  # Utility functions
│   └── bondCalculations.ts # Bond calculation logic
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

1. **Home Screen** - Input form for bond parameters
2. **Result Screen** - Displays calculated yields and metrics
3. **Cash Flow Screen** - Shows payment schedule with FlatList table

## Development

This app is built with:
- Strong TypeScript typing
- Separated business logic in utilities
- Clean component architecture
- Modern React Native patterns
- Expo Router for navigation

## License

MIT License
