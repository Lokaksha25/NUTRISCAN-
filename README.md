# NutriScan

NutriScan is a web application built using React and Vite.

## Setup and Run Instructions

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Open a terminal in the project directory (`nutriscan`).
2. Run the following command to install all the required dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

1. Once the installation is complete, start the development server using:
   ```bash
   npm run dev
   ```
2. The terminal will display a local URL (usually `http://localhost:3000`). Open this URL in your browser to view the application.

*Note: If the app requires API keys (like Groq or OpenRouter), make sure to configure your `.env` file appropriately before running the server.*

## Converting to an Android APK

To package this web application into a mobile app (APK) that runs on Android devices, you can use **Capacitor**. Here are the steps:

### 1. Build the Web App
First, create a production build of your application:
```bash
npm run build
```

### 2. Install Capacitor
Install the Capacitor core and CLI tools into your project:
```bash
npm install @capacitor/core
npm install -D @capacitor/cli
```

### 3. Initialize Capacitor
Initialize the Capacitor configuration:
```bash
npx cap init
```
* During initialization, it will ask for the **App Name** (e.g., `NutriScan`) and the **App Package ID** (e.g., `com.nutriscan.app`).
* When prompted for the Web asset directory, enter `dist` (which is the default output folder for Vite).

### 4. Add the Android Platform
Install the Android package and add the Android platform to your project:
```bash
npm install @capacitor/android
npx cap add android
```

### 5. Sync the Project
Copy your built web assets into the Android project:
```bash
npx cap sync
```

### 6. Build the APK using Android Studio
You will need **Android Studio** installed on your computer to generate the final APK.

1. Open the generated Android project in Android Studio by running:
   ```bash
   npx cap open android
   ```
2. In Android Studio, wait a few moments for the project and Gradle to finish syncing.
3. To generate the APK, navigate to the top menu and select:
   **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
4. Once the build finishes, Android Studio will show a notification in the bottom right corner. Click on **locate** to find your generated `.apk` file.
5. You can now transfer this `.apk` file to your Android device and install it (make sure you have allowed installing from unknown sources in your device settings).
