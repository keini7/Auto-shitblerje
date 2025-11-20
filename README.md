# 🚗 Car Marketplace - Full Stack Application

Aplikacion i plotë për shitje makinash me backend Node.js/Express dhe frontend Ionic React.

## 📋 Përmbajtja

- [Backend](#backend) - Node.js + Express + MongoDB
- [Frontend](#frontend) - Ionic React (Web + Mobile Native)
- [Quick Start](#quick-start)
- [Development](#development)
- [Mobile App](#mobile-app)

---

## 🎯 Backend

**Teknologji:** Node.js, Express, MongoDB, JWT Auth, Multer, Sharp

### Karakteristika:
- ✅ Autentifikim (Register/Login/JWT)
- ✅ CRUD për makina
- ✅ Upload dhe optimizim fotosh
- ✅ Kërkim, filtra dhe sortim
- ✅ Pagination
- ✅ Swagger API Documentation

### Si ta nisësh:

```bash
cd carbackend
npm install

# Krijo .env:
MONGO_URI=mongodb://127.0.0.1:27017/car-marketplace
JWT_SECRET=your-secret-key
PORT=8000

# Nis serverin:
npm run dev
```

Backend hapet në: `http://localhost:8000`  
Swagger Docs: `http://localhost:8000/api-docs`

---

## 🎨 Frontend

**Teknologji:** Ionic React, TypeScript, Capacitor

### Karakteristika:
- ✅ Web App (Vite + React)
- ✅ Mobile Native App (Android/iOS me Capacitor)
- ✅ Tab Navigation
- ✅ Infinite Scroll
- ✅ Pull to Refresh
- ✅ Favorites System
- ✅ Search & Filters
- ✅ Image Upload

### Si ta nisësh:

```bash
cd carfront-ionic
npm install
npm run dev
```

Frontend hapet në: `http://localhost:5173`

---

## 🚀 Quick Start

### Nis të dyja njëkohësisht:

```bash
# Nga root directory:
npm install  # Instalo dependencies për të dyja
npm run dev  # Nis backend dhe frontend njëkohësisht
```

Kjo do të:
1. Nisë backend në `http://localhost:8000`
2. Nisë frontend në `http://localhost:5173`
3. Pastrojë portet 8000 dhe 5173 nëse janë të zëna

---

## 📱 Mobile App

### Për Android:

1. **Kërkesat:**
   - Node.js >= 20.0.0
   - Android Studio

2. **Setup:**
   ```bash
   cd carfront-ionic
   
   # Load Node.js 20 (nëse përdor nvm)
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   nvm use 20
   
   # Build dhe shto Android platform
   npm run build
   npx cap add android
   npx cap sync
   
   # Hap në Android Studio
   npm run cap:android
   ```

3. **Në Android Studio:**
   - Prit që Gradle të sync-ojë
   - Zgjidh emulator ose lidh telefonin
   - Kliko "Run" (▶️)

### IP Auto-Detection:

IP-ja e kompjuterit **gjetet automatikisht** kur ekzekuton `npm run cap:sync`. Script-i `scripts/setup-mobile-env.cjs`:
- Gjen automatikisht IP-në e kompjuterit
- Përditëson `capacitor.config.ts`
- Përditëson `.env`

**Nuk ka nevojë të ndryshosh manualisht IP-në!**

### Për iOS (vetëm macOS):

```bash
npm run build
npx cap add ios
npx cap sync
npm run cap:ios
```

---

## 🔧 Development

### Backend:

```bash
cd carbackend
npm run dev  # Nis me nodemon
```

### Frontend:

```bash
cd carfront-ionic
npm run dev  # Nis Vite dev server
```

### Përditësimi i Mobile App:

```bash
cd carfront-ionic
npm run build
npx cap sync
npm run cap:android  # ose cap:ios
```

---

## 📚 Dokumentacioni

- **Backend API:** `http://localhost:8000/api-docs` (Swagger)
- **Frontend Quick Start:** `carfront-ionic/QUICK_START.md`
- **Mobile Setup:** `carfront-ionic/BUILD_NATIVE_APP.md`
- **Mobile Access:** `carfront-ionic/MOBILE_ACCESS.md`

---

## 🛠️ Teknologjitë

### Backend:
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file upload)
- Sharp (image optimization)
- Swagger (API docs)

### Frontend:
- Ionic React
- TypeScript
- React Router v5
- Capacitor (Native mobile)
- Vite (build tool)

---

## 📝 API Endpoints

### Auth:
- `POST /api/auth/register` - Regjistro përdorues
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Merr të dhënat e përdoruesit (kërkon token)

### Cars:
- `GET /api/cars` - Lista e makinave (me search, filters, sort, pagination)
- `GET /api/cars/:id` - Detajet e një makine
- `POST /api/cars` - Krijo makinë (kërkon token)
- `DELETE /api/cars/:id` - Fshi makinë (kërkon token)
- `GET /api/cars/me/mine` - Makinat e mia (kërkon token)

### Upload:
- `POST /api/upload/car-image` - Upload foto (kërkon token)

---

## 🐛 Troubleshooting

### Backend nuk niset:
- Kontrollo që MongoDB po funksionon
- Verifiko `.env` file
- Kontrollo që porti 8000 nuk është i zënë

### Frontend nuk lidhet me backend:
- Verifiko që backend po dëgjon në `0.0.0.0:8000` (jo vetëm localhost)
- Kontrollo CORS në `server.js`
- Verifiko `VITE_API_BASE_URL` në `.env`

### Mobile app nuk lidhet me backend:
- Verifiko që telefoni dhe kompjuteri janë në të njëjtën WiFi
- Kontrollo që `capacitor.config.ts` ka IP-në e saktë
- Verifiko që backend po dëgjon në `0.0.0.0:8000`

### Node.js version:
- Capacitor kërkon Node.js >= 20.0.0
- Përdor `nvm` për të ndryshuar version:
  ```bash
  nvm install 20
  nvm use 20
  ```

---

## 📄 License

MIT

---

## 👤 Autor

Keini Hoxha

## Note: ky eshte nje aplikacion prove per te treguar njohurite dhe aftesite e mia ne programim. Faleminderit!
