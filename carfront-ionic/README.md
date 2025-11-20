# 🚗 Car Marketplace - Ionic React Frontend

Frontend i aplikacionit Car Marketplace, i ndërtuar me Ionic React dhe Capacitor për web dhe mobile native.

## 🚀 Quick Start

### Development (Web):

```bash
npm install
npm run dev
```

Aplikacioni hapet në: `http://localhost:5173`

### Mobile App (Android/iOS):

Shiko: [QUICK_START.md](./QUICK_START.md) për udhëzime të detajuara.

---

## 📁 Struktura e Projektit

```
carfront-ionic/
├── src/
│   ├── api/              # API calls (auth, cars, upload)
│   ├── components/      # React components
│   ├── constants/       # Config & constants
│   ├── context/         # React Context (Auth, Favorites)
│   ├── pages/           # Page components
│   └── theme/           # Ionic theme variables
├── android/             # Android native project
├── scripts/             # Build scripts (auto-detect IP)
├── capacitor.config.ts  # Capacitor configuration
└── vite.config.ts       # Vite configuration
```

---

## 🎯 Karakteristika

- ✅ **Web App** - Funksionon në shfletues
- ✅ **Mobile Native** - Android/iOS me Capacitor
- ✅ **Tab Navigation** - Home, Search, Favorites, Account
- ✅ **Infinite Scroll** - Ngarkim automatik i makinave
- ✅ **Pull to Refresh** - Rifreskim me tërheqje
- ✅ **Search & Filters** - Kërkim dhe filtra për makina
- ✅ **Favorites** - Ruajtje lokale e makinave të preferuara
- ✅ **Image Upload** - Ngarkim fotosh për makina
- ✅ **Auto IP Detection** - Gjen automatikisht IP-në për mobile

---

## 📱 Mobile App Setup

### Kërkesat:
- Node.js >= 20.0.0
- Android Studio (për Android)
- Xcode (për iOS - vetëm macOS)

### Android:

```bash
# Load Node.js 20
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

# Build dhe setup
npm run build
npx cap add android
npx cap sync
npm run cap:android
```

### iOS:

```bash
npm run build
npx cap add ios
npx cap sync
npm run cap:ios
```

---

## ⚙️ Konfigurimi

### Environment Variables:

Krijo `.env` file:

```bash
# Për web development:
VITE_API_BASE_URL=http://localhost:8000

# Për mobile (auto-detected):
# Script-i gjen automatikisht IP-në dhe e vendos këtu
```

### Auto IP Detection:

Script-i `scripts/setup-mobile-env.cjs` gjen automatikisht IP-në e kompjuterit dhe:
- Përditëson `capacitor.config.ts`
- Përditëson `.env`

Ekzekutohet automatikisht kur bën `npm run cap:sync`.

---

## 🔄 Përditësimi i Aplikacionit

### Web:
```bash
npm run build
```

### Mobile:
```bash
npm run build
npx cap sync
npm run cap:android  # ose cap:ios
```

Pastaj në Android Studio/Xcode, kliko "Run" përsëri.

---

## 📚 Dokumentacioni

- **Quick Start:** [QUICK_START.md](./QUICK_START.md)
- **Build Native App:** [BUILD_NATIVE_APP.md](./BUILD_NATIVE_APP.md)
- **Mobile Access:** [MOBILE_ACCESS.md](./MOBILE_ACCESS.md)

---

## 🛠️ Scripts

```bash
npm run dev          # Nis dev server
npm run build        # Build për prodhim
npm run preview      # Preview build
npm run cap:android  # Hap Android Studio
npm run cap:ios      # Hap Xcode
npm run cap:sync     # Sync me Capacitor (auto-detect IP)
```

---

## 🐛 Troubleshooting

### "NodeJS >=20.0.0 required"
```bash
nvm install 20
nvm use 20
```

### "SDK location not found"
Krijo `android/local.properties`:
```properties
sdk.dir=/path/to/Android/Sdk
```

### Aplikacioni nuk lidhet me backend
- Verifiko që backend po dëgjon në `0.0.0.0:8000`
- Kontrollo `capacitor.config.ts` për IP-në e saktë
- Sigurohu që telefoni dhe kompjuteri janë në të njëjtën WiFi

---

## 📄 License

MIT

