# EVZ Swap Client

<div align="center">

**Fast Electric Vehicle Battery Swapping Network**

Battery swapping made effortless. Find nearby EV battery swap stations, book your slot, and swap your battery in minutes.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## Overview

EVZ Swap Client is a modern, responsive web application that enables electric vehicle owners to seamlessly locate, book, and utilize battery swap stations. Built with cutting-edge web technologies, the application provides an intuitive user experience for managing battery swaps, payments, and vehicle profiles.

## Features

### 🔋 Core Functionality
- **Station Discovery**: Find nearby battery swap stations with real-time availability
- **Smart Booking**: Reserve battery slots with countdown timers and extension options
- **QR Code Scanning**: Scan station and battery QR codes for seamless swap initiation
- **Self-Service & Operator-Assisted**: Support for both self-service and operator-assisted swap flows

### 💳 Wallet & Payments
- **Digital Wallet**: Manage wallet balance and payment methods
- **Transaction History**: Track all swap transactions and payments
- **Multiple Payment Methods**: Support for various payment options
- **Invoice Management**: Access and download transaction invoices

### 📊 Dashboard & Analytics
- **Battery Health Tracking**: Monitor battery health metrics over time
- **Carbon Savings**: View environmental impact and carbon savings
- **Swap History**: Comprehensive history of all swap sessions
- **Export Capabilities**: Export transaction and swap history data

### 👤 User Management
- **Profile Management**: Complete user profile with vehicle information
- **Multi-Vehicle Support**: Manage multiple vehicles in your account
- **Language Selection**: Support for multiple languages (English, Kiswahili, Français, Hindi, Chinese)
- **Notification Settings**: Customize notification preferences
- **Two-Factor Authentication**: Enhanced security with 2FA support

### 🛠️ Additional Features
- **Favorites**: Save frequently used stations
- **Search & Filters**: Advanced station search with filtering options
- **Offline Mode**: Basic offline functionality support
- **Help Center**: Comprehensive support and FAQ section
- **Referral Program**: Invite friends and earn rewards

## Tech Stack

### Frontend Framework
- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.6.3** - Type-safe development
- **Vite 5.4.11** - Fast build tool and dev server

### UI & Styling
- **Material-UI (MUI) 7.3.5** - Comprehensive component library
- **Emotion** - CSS-in-JS styling solution
- **Custom CSS** - Mobile-first responsive design

### Routing & Navigation
- **React Router DOM 7.9.6** - Client-side routing

### Development Tools
- **Vitest** - Fast unit test framework
- **Testing Library** - React component testing utilities
- **ESLint** - Code linting and quality

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd evz-swap-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Building
```bash
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Testing
```bash
npm test             # Run test suite with Vitest
```

## Project Structure

```
evz-swap-client/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── manifest.json
│   └── splash.png
├── src/
│   ├── layout/            # Layout components
│   │   ├── AppShell.tsx
│   │   ├── BottomNavigation.tsx
│   │   └── EvzScreen.tsx
│   ├── router/            # Routing configuration
│   │   ├── AppRouter.tsx
│   │   └── routes.ts
│   ├── screens/           # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── onboarding/    # Onboarding flow
│   │   ├── stations/      # Station discovery
│   │   ├── booking/       # Booking management
│   │   ├── swap/          # Swap flow screens
│   │   ├── wallet/        # Wallet & payments
│   │   ├── history/       # Transaction history
│   │   ├── dashboard/     # Dashboard & analytics
│   │   ├── profile/       # User profile
│   │   ├── support/       # Support screens
│   │   └── system/        # System/error screens
│   ├── shared/            # Shared utilities
│   │   ├── api/           # API client functions
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   ├── styles/            # Global styles
│   ├── App.tsx            # Root component
│   ├── index.tsx          # Application entry point
│   └── reportWebVitals.ts # Performance monitoring
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Key Features Implementation

### Authentication Flow
- Phone number-based authentication with OTP verification
- Session management with localStorage
- Multi-language support during onboarding

### Station Management
- Real-time station location and availability
- Interactive map and list views
- Advanced filtering and search capabilities
- Favorite stations functionality

### Booking System
- Time-based slot reservations
- Countdown timers with extension options
- Payment integration for booking fees
- Automatic expiration handling

### Swap Process
- QR code scanning for stations and batteries
- Step-by-step swap guidance
- Safety checklist verification
- Energy payment processing
- Swap completion and rating

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=your_api_url
VITE_APP_NAME=EVZ Swap Client
```

Note: All environment variables must be prefixed with `VITE_` to be accessible in the application.

## Building for Production

```bash
# Build the application
npm run build

# The production build will be in the dist/ directory
# Deploy the contents of dist/ to your hosting provider
```

## Performance

- **Fast Initial Load**: Optimized bundle size with code splitting
- **Hot Module Replacement**: Instant updates during development
- **Production Optimizations**: Minification, tree-shaking, and asset optimization
- **Web Vitals**: Performance monitoring integrated

## Contributing

This is a proprietary project owned by EVZone Group. For contribution guidelines, please contact the project maintainers.

## Support

For support and inquiries:
- **Help Center**: Available within the application
- **Contact Support**: Use the in-app support feature
- **Report Issues**: Submit issues through the application's report feature

## License

Copyright © 2024 EVZone Group. All rights reserved.

This software and associated documentation files (the "Software") are the proprietary and confidential property of EVZone Group. Unauthorized copying, modification, distribution, or use of this Software, via any medium, is strictly prohibited without the express written permission of EVZone Group.

## Ownership

**Owner**: EVZone Group  
**Project**: EVZ Swap Client  
**Version**: 0.1.0

---

<div align="center">

**Made with ❤️ by EVZone Group**

*Empowering the future of electric mobility*

</div>
