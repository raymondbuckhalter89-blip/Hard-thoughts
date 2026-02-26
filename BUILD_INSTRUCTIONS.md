# How to Build the APK

This document explains how to build the Android APK for the Hard Thoughts app.

## Prerequisites

The project has been configured with:
- ✅ Capacitor Android support
- ✅ Tailwind CSS and required dependencies
- ✅ Vite build configuration
- ✅ GitHub Actions workflow for automated building

## Option 1: Build via GitHub Actions (Recommended)

The easiest way to build the APK is using GitHub Actions, which runs in GitHub's cloud infrastructure with access to all required dependencies.

### Steps:

1. Push your changes to the `copilot/build-apk` branch (or any branch)
2. Go to your GitHub repository
3. Click on the "Actions" tab
4. Select "Build Android APK" workflow
5. Click "Run workflow"
6. Wait for the workflow to complete (usually 3-5 minutes)
7. Download the APK from the workflow artifacts

The workflow will:
- Install Node.js dependencies
- Build the web application
- Initialize and configure Capacitor
- Build the Android APK
- Upload the APK as an artifact

### Automatic Builds

The workflow is also configured to run automatically when you push to the `copilot/build-apk` branch.

## Option 2: Build Locally

To build locally, you need:
- Node.js 18+
- Android Studio with Android SDK
- JDK 17

### Steps:

```bash
cd hard-thoughts-app

# Install dependencies
npm install

# Build the web application  
npm run build

# Initialize Capacitor (first time only)
npx cap init HardThoughts com.hardthoughts.app --web-dir=dist

# Add Android platform (first time only)
npx cap add android

# Sync web assets to Android
npx cap sync android

# Build the APK
cd android
./gradlew assembleDebug
```

The APK will be located at:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Notes

- The app uses localStorage for data storage and works completely offline
- Default admin PIN: **4242** (can be changed in the Admin > Users tab)
- The debug APK is not optimized; for production builds, use `./gradlew assembleRelease` and sign the APK

## Troubleshooting

### Cannot access dl.google.com

If you encounter network issues accessing Google's Maven repository, use the GitHub Actions workflow instead. GitHub's runners have access to all required repositories.

### Missing dependencies

If dependencies are missing, run:
```bash
npm install
npm install @capacitor/android@^6.1.2
```
