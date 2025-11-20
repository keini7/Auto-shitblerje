# Si të krijohet aplikacion native për telefon

## Kërkesat paraprake

1. **Node.js >= 20.0.0** (për Capacitor CLI)
   - Kontrollo versionin: `node --version`
   - Nëse ke version më të vjetër, përditësoje ose përdor `nvm`

2. **Android Studio** (për Android)
   - Shkarko nga: https://developer.android.com/studio
   - Instalo Android SDK dhe emulator

3. **Xcode** (për iOS - vetëm macOS)
   - Instalo nga App Store

---

## Hapat për Android

### 1. Build aplikacionin
```bash
cd /home/keini/Desktop/auto/carfront-ionic
npm run build
```

### 2. Init Capacitor (nëse nuk është bërë)
```bash
npx cap init
```
- App ID: `com.carmarketplace.app`
- App Name: `Car Marketplace`
- Web Dir: `dist`

### 3. Shto platformën Android
```bash
npx cap add android
```

### 4. Sync me Capacitor
```bash
npx cap sync
```

### 5. Hap në Android Studio
```bash
npx cap open android
```

### 6. Në Android Studio:
- Prit që të ngarkohet projekti
- Zgjidh një emulator ose lidh telefonin me USB
- Kliko "Run" (▶️) për të instaluar aplikacionin

---

## Hapat për iOS (vetëm macOS)

### 1. Build aplikacionin
```bash
cd /home/keini/Desktop/auto/carfront-ionic
npm run build
```

### 2. Shto platformën iOS
```bash
npx cap add ios
```

### 3. Sync me Capacitor
```bash
npx cap sync
```

### 4. Hap në Xcode
```bash
npx cap open ios
```

### 5. Në Xcode:
- Zgjidh një simulator ose lidh iPhone me USB
- Kliko "Run" (▶️) për të instaluar aplikacionin

---

## Përditësimi i aplikacionit

Kur bën ndryshime në kod:

1. **Build përsëri:**
   ```bash
   npm run build
   ```

2. **Sync me Capacitor:**
   ```bash
   npx cap sync
   ```

3. **Hap në Android Studio/Xcode dhe run përsëri**

---

## Konfigurimi i API URL

Për aplikacionin native, duhet të përdorësh IP-në e kompjuterit ose një URL të prodhimit.

Në `capacitor.config.ts`, mund të vendosësh:
```typescript
server: {
  url: 'http://192.168.1.216:8000', // IP-ja e kompjuterit
  androidScheme: 'https',
  iosScheme: 'https',
}
```

Ose përdor një URL të prodhimit në `.env`:
```bash
VITE_API_BASE_URL=https://api.example.com
```

---

## Troubleshooting

### Problem: "NodeJS >=20.0.0 required"
**Zgjidhje:** Përditëso Node.js ose përdor `nvm`:
```bash
nvm install 20
nvm use 20
```

### Problem: "Command not found: npx cap"
**Zgjidhje:** Instalo Capacitor CLI globalisht:
```bash
npm install -g @capacitor/cli
```

### Problem: Android Studio nuk hapet
**Zgjidhje:** Verifiko që Android Studio është instaluar dhe `ANDROID_HOME` është konfiguruar.

### Problem: Aplikacioni nuk lidhet me backend
**Zgjidhje:** 
- Verifiko që backend po dëgjon në `0.0.0.0:8000`
- Përditëso `capacitor.config.ts` me IP-në e saktë
- Kontrollo CORS në backend

---

## Build për prodhim

### Android (APK):
```bash
# Në Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### iOS (IPA):
```bash
# Në Xcode: Product > Archive
```

