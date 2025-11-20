# ⚠️ Kërkesa: Node.js >= 20.0.0

Aktualisht ke Node.js version 18.19.1, por Capacitor CLI kërkon >= 20.0.0.

## Zgjidhja 1: Përditëso Node.js (Rekomanduar)

### Me nvm (nëse e ke instaluar):
```bash
# Instalo Node.js 20
nvm install 20
nvm use 20

# Verifiko versionin
node --version

# Pastaj ekzekuto komandat përsëri:
cd /home/keini/Desktop/auto/carfront-ionic
npm run cap:android
```

### Ose shkarko direkt:
- Shkarko nga: https://nodejs.org/
- Zgjidh versionin LTS (20.x ose më të ri)

## Zgjidhja 2: Përdor npx me version specifik

Mund të provosh të përdorësh npx me një version specifik, por më e mirë është të përditësosh Node.js.

## Pas përditësimit:

```bash
cd /home/keini/Desktop/auto/carfront-ionic

# Build (tashmë u bë)
# npm run build

# Shto Android platform
npx cap add android

# Sync
npx cap sync

# Hap në Android Studio
npx cap open android
```

