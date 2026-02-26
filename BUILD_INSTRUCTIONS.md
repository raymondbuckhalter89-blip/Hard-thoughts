# How to Build the APK

This document explains how to build the Android APK for the Hard Thoughts app.

## Quick Start: Using GitHub Actions (Recommended)

The APK can be built automatically using GitHub Actions:

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Select **Build Android APK** from the workflows list
4. Click **Run workflow** button (top right)
5. Select the `copilot/build-apk` branch
6. Click the green **Run workflow** button
7. Wait 3-5 minutes for the build to complete
8. Download the APK from the workflow run's **Artifacts** section

The workflow will automatically build the APK and make it available for download.

## Prerequisites

The project has been configured with:
- ✅ Capacitor Android support
- ✅ Tailwind CSS and required dependencies
- ✅ Vite build configuration
- ✅ GitHub Actions workflow for automated building

## Option 1: Build via GitHub Actions (Automated)

The GitHub Actions workflow is configured to run:
- Automatically on every push to the `copilot/build-apk` branch
- Manually via the "Run workflow" button in the Actions tab

The workflow will:
- Install Node.js dependencies
- Build the web application
- Initialize and configure Capacitor
- Build the Android APK
- Upload the APK as an artifact named `hard-thoughts-debug-apk`

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

### Workflow needs approval

If the workflow shows "action_required", you may need to:
1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", ensure workflows have read and write permissions
3. Re-run the workflow from the Actions tab

### Missing dependencies

If dependencies are missing, run:
```bash
npm install
npm install @capacitor/android@^6.1.2
```
