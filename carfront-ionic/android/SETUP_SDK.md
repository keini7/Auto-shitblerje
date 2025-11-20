# 🔧 Konfigurimi i Android SDK

## Problemi: "SDK location not found"

Android Studio kërkon të dijë ku është Android SDK. Kjo konfigurohet në skedarin `local.properties`.

## Zgjidhja:

### 1. Gjej vendndodhjen e Android SDK

Nëse ke instaluar Android Studio, SDK zakonisht është në:
- Linux: `~/Android/Sdk`
- macOS: `~/Library/Android/sdk`
- Windows: `%LOCALAPPDATA%\Android\Sdk`

### 2. Krijo skedarin `local.properties`

Në folder-in `android/`, krijo skedarin `local.properties` me përmbajtjen:

```properties
sdk.dir=/home/keini/Android/Sdk
```

**Ndryshoje path-in me vendndodhjen e vërtetë të SDK-së tënde.**

### 3. Ose konfiguro në Android Studio:

1. Hap Android Studio
2. File > Settings (ose Preferences në macOS)
3. Appearance & Behavior > System Settings > Android SDK
4. Shiko "Android SDK Location" - kjo është path-i që duhet të vendosësh në `local.properties`

### 4. Nëse nuk ke Android SDK:

1. Shkarko Android Studio nga: https://developer.android.com/studio
2. Instalo dhe hap Android Studio
3. Ndiq wizard-in për të instaluar Android SDK
4. Pastaj përdor path-in që tregon Android Studio

## Komanda për të krijuar `local.properties`:

```bash
cd /home/keini/Desktop/auto/carfront-ionic/android
echo "sdk.dir=/home/keini/Android/Sdk" > local.properties
```

**Ndryshoje path-in me vendndodhjen e vërtetë të SDK-së tënde.**

