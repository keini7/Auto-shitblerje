# Quick Start - Aplikacion Native

## ⚠️ Kërkesa e parë: Node.js >= 20.0.0

Kontrollo versionin:
```bash
node --version
```

Nëse ke version më të vjetër se 20, përditësoje:
```bash
# Me nvm (nëse e ke instaluar):
nvm install 20
nvm use 20

# Ose shkarko nga: https://nodejs.org/
```

---

## 📱 Për Android

### 1. Instalo Android Studio
- Shkarko nga: https://developer.android.com/studio
- Instalo dhe hap Android Studio për herë të parë (do të instaloje SDK)

### 2. Build dhe Setup
```bash
cd /home/keini/Desktop/auto/carfront-ionic

# Build aplikacionin
npm run build

# Shto platformën Android (vetëm herën e parë)
npx cap add android

# Sync me Capacitor
npx cap sync
```

### 3. Hap në Android Studio
```bash
npm run cap:android
```

### 4. Në Android Studio:
- Prit që të ngarkohet projekti (mund të zgjasë disa minuta herën e parë)
- Zgjidh një emulator ose lidh telefonin me USB
- Aktivizo "USB Debugging" në telefon (Settings > Developer Options)
- Kliko "Run" (▶️) për të instaluar aplikacionin

---

## 🍎 Për iOS (vetëm macOS)

### 1. Instalo Xcode
- Shkarko nga App Store

### 2. Build dhe Setup
```bash
cd /home/keini/Desktop/auto/carfront-ionic

# Build aplikacionin
npm run build

# Shto platformën iOS (vetëm herën e parë)
npx cap add ios

# Sync me Capacitor
npx cap sync
```

### 3. Hap në Xcode
```bash
npm run cap:ios
```

### 4. Në Xcode:
- Zgjidh një simulator ose lidh iPhone me USB
- Kliko "Run" (▶️) për të instaluar aplikacionin

---

## 🔄 Përditësimi i aplikacionit

Kur bën ndryshime në kod:

```bash
# 1. Build përsëri
npm run build

# 2. Sync me Capacitor
npx cap sync

# 3. Hap në Android Studio/Xcode dhe run përsëri
npm run cap:android  # ose cap:ios
```

---

## ⚙️ Konfigurimi i Backend URL (Automatik)

IP-ja e kompjuterit **gjetet automatikisht** kur ekzekuton `npm run cap:sync` ose `npm run build:mobile`.

Script-i `scripts/setup-mobile-env.cjs`:
- Gjen automatikisht IP-në e kompjuterit
- Përditëson `capacitor.config.ts` me IP-në e gjetur
- Përditëson `.env` me IP-në e gjetur

**Nuk ka nevojë të ndryshosh manualisht IP-në!** Script-i e bën automatikisht.

Nëse dëshiron ta ekzekutosh manualisht:
```bash
node scripts/setup-mobile-env.cjs
```

---

## 🐛 Troubleshooting

### "NodeJS >=20.0.0 required"
**Zgjidhje:** Përditëso Node.js (shiko më lart)

### "Command not found: npx cap"
**Zgjidhje:** 
```bash
npm install -g @capacitor/cli
```

### Android Studio nuk hapet
**Zgjidhje:** 
- Verifiko që Android Studio është instaluar
- Kontrollo që `ANDROID_HOME` është konfiguruar:
  ```bash
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

### Aplikacioni nuk lidhet me backend
**Zgjidhje:**
- Verifiko që backend po dëgjon në `0.0.0.0:8000` (jo vetëm localhost)
- Përditëso `capacitor.config.ts` me IP-në e saktë
- Kontrollo që telefoni dhe kompjuteri janë në të njëjtën WiFi

---

## 📦 Build për prodhim

### Android (APK):
1. Në Android Studio: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. APK do të jetë në: `android/app/build/outputs/apk/`

### iOS (IPA):
1. Në Xcode: `Product > Archive`
2. Ndiq udhëzimet për të uploaduar në App Store

