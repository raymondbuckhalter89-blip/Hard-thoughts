# Hard Thoughts - Build Instructions

## Overview
This repository contains the Hard Thoughts app that can be built as a web application and compiled into an Android APK.

## Quick Start - Building APK via GitHub Actions (Recommended)

The easiest way to build an APK is using GitHub Actions:

1. Go to the **Actions** tab in this repository
2. Select the "Build Android APK" workflow
3. Click "Run workflow"
4. Wait for the build to complete (approximately 5-10 minutes)
5. Download the APK artifact from the workflow run
6. Install the APK on your Android device

## Manual Build (Requires Android Studio)

If you want to build locally:

### Prerequisites
- Node.js 18+
- Android Studio with Android SDK
- JDK 17

### Steps

1. **Extract the app**
   ```bash
   unzip hard-thoughts-app-fullstack.zip
   cd hard-thoughts-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install -D tailwindcss@3 postcss autoprefixer
   npm install @capacitor/android@^6.1.2
   ```

3. **Build the web app**
   ```bash
   npm run build
   ```

4. **Initialize Capacitor and add Android platform**
   ```bash
   npx cap init HardThoughts com.hardthoughts.app --web-dir=dist
   npx cap add android
   npx cap sync android
   ```

5. **Build APK with Android Studio**
   ```bash
   npx cap open android
   ```
   Then in Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)

   **OR** build from command line:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   
   The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Configuration

The app has been configured with:
- **App Name**: HardThoughts
- **Package ID**: com.hardthoughts.app
- **Build Tool**: Capacitor 6.x
- **Framework**: React + Vite + Tailwind CSS

## Features

- Offline-first design using localStorage
- Admin panel with default PIN: **4242**
- React-based UI with Framer Motion animations
- Dark theme with Art Deco styling

## Notes

- The workflow file is located at `.github/workflows/android-apk.yml`
- The source code is in the `hard-thoughts-app` directory
- The APK built will be a debug version (not signed for production)
