# Coffee App

A mobile application for coffee enthusiasts built with React Native.

## Features

- Google Sign-in authentication
- Responsive UI across different device sizes
- Coffee catalog browsing
- Greeting notifications
- Smooth animations and transitions
- Persistent storage with MMKV
- State management with Zustand

## Download the APK

https://github.com/Rjmhrzn-002/outside-coffee-app-rojen/releases/tag/v1.0.0

## Demo App Recoring

### Unauthorized Screen Recording          

[![All](src/assets/images/github/onboard.jpg)](https://drive.google.com/file/d/1wv6dJdxA05M4vl0QHNKyvXCC8Zivm5ga/view?usp=sharing)

## Installation

1. Clone the repository

```
git clone https://github.com/Rjmhrzn-002/outside-coffee-app-rojen
```

2. Install dependencies

```
cd repo-name
npm install
```

3. Run the application

```
npx react-native run-android
# or
npx react-native run-ios
```

## Technologies Used

- React Native
- @react-native-google-signin/google-signin - For Google authentication
- MMKV Storage - For efficient data persistence
- Zustand - For state management
- React Native Linear Gradient - For UI gradients
- React Native Reanimated - For smooth animations
- Notifee - For handling notifications
- Custom responsive styling system for different screen sizes

## Project Structure

```
src/
├── assets/        # Images, fonts, and icons
├── components/    # Reusable UI components
├── configs/       # Configuration files
├── constants/     # App constants and theme
├── screens/       # App screens
└── utils/         # Utility functions
```

## Development Approach

This project implements responsive design principles to ensure the app looks great on all device sizes. Key responsive features include:

- Dynamic sizing based on screen dimensions
- Proportional spacing and typography
- Flexible layouts that adapt to different screen sizes
- Consistent visual hierarchy across devices
