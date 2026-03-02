# Hard Thoughts (Offline Demo) — Build + APK

This is a **finished, self-contained** React (Vite) app that runs offline and can be wrapped into an Android APK using **Capacitor**.

## 1) Run on desktop (fast sanity check)

```bash
npm install
npm run dev
```

Open the shown URL.

## 2) Build the web bundle

```bash
npm run build
npm run preview
```

## 3) Turn it into an Android app (APK)

### Requirements on your PC
- **Node.js 18+**
- **Android Studio** (installs Android SDK + build tools)
- JDK 17 (Android Studio usually bundles it)

### Steps

```bash
npm install

# Initialize Capacitor (one time)
npx cap init HardThoughts com.hardthoughts.app --web-dir=dist

# Add Android platform (one time)
npx cap add android

# Build + sync web assets into Android
npm run build
npx cap sync android

# Open Android Studio
npx cap open android
```

### In Android Studio
- **Build > Build Bundle(s) / APK(s) > Build APK(s)**
- The APK output path will be shown in the Build panel.

## Notes
- Admin login default PIN: **4242** (change it inside Admin > Users tab).
- This demo uses **localStorage** as the database.
- When you’re ready, replace the local admin store with your real backend (tRPC/DB).

---

## Optional: Real backend (Full‑stack mode)

This project includes a small **Node + Express + SQLite** admin backend under `server/`.

### Run the backend (desktop)
```bash
cd server
npm install
npm run dev
```

It will start on `http://localhost:8787` and exposes:
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/invites`
- `POST /api/admin/invites`
- `GET /api/admin/search-history`
- `GET /api/admin/users/:id/search-history`

Right now the app UI uses the **offline adminStore** by default (so it works inside an APK with no server).
If you want the UI to use the server, wire your UI calls to these endpoints (or tell me which UI shape you want and I’ll map it).

---

## Build an APK **on your Android phone** (two ways)

### Option A (recommended): GitHub Actions builds the APK for you
This is the least pain, because compiling Android apps on a phone is… character building.

1. Create a GitHub repo and push this project.
2. Add the workflow file below: `.github/workflows/android-apk.yml`
3. Open GitHub → your repo → **Actions** → run the workflow.
4. Download the APK artifact to your phone and install it.

Workflow file:

```yaml
name: Build Android APK

on:
  workflow_dispatch:

jobs:
  apk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - name: Install deps
        run: npm ci

      - name: Build web
        run: npm run build

      - name: Capacitor init (first time only)
        run: |
          npx cap init HardThoughts com.hardthoughts.app --web-dir=dist || true
          npx cap add android || true

      - name: Sync Android
        run: npx cap sync android

      - name: Build APK
        run: |
          cd android
          ./gradlew assembleDebug

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: hard-thoughts-debug-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

### Option B (hard mode): build locally in Termux (no PC)
This works, but it’s heavy: **6–10GB** storage and a lot of downloads.

1) Install Termux and update packages:
```bash
pkg update -y && pkg upgrade -y
pkg install -y git nodejs-lts openjdk-17 wget unzip python
```

2) Clone your repo and install JS deps:
```bash
git clone <YOUR_REPO_URL>
cd hard-thoughts-app
npm install
npm run build
```

3) Install Capacitor tooling:
```bash
npm i -D @capacitor/cli
npm i @capacitor/core
npx cap init HardThoughts com.hardthoughts.app --web-dir=dist
npx cap add android
npx cap sync android
```

4) Install Android SDK command line tools (Termux):
- Download Google “command line tools” zip
- Unzip into something like `~/android-sdk/cmdline-tools/latest/`
- Set env vars in `~/.bashrc` or `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
```

5) Install build tools + accept licenses:
```bash
sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

6) Build the APK:
```bash
cd android
./gradlew assembleDebug
```

APK output:
`android/app/build/outputs/apk/debug/app-debug.apk`

If Gradle explodes with memory errors on-device, GitHub Actions is the escape pod.
