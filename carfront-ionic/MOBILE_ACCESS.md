# Si të hapësh aplikacionin në telefon

## Metoda 1: Përmes WiFi (më e shpejtë për testim)

### Hapat:

1. **Sigurohu që telefoni dhe kompjuteri janë në të njëjtën rrjetë WiFi**

2. **Krijo skedarin `.env` në `carfront-ionic/`:**
   ```bash
   cd carfront-ionic
   echo "VITE_API_BASE_URL=http://192.168.1.216:8000" > .env
   ```

3. **Nis backend dhe frontend:**
   ```bash
   cd /home/keini/Desktop/auto
   npm run dev
   ```

4. **Në telefon, hap shfletuesin dhe shkruaj:**
   ```
   http://192.168.1.216:5173
   ```

### Shënim:
- Nëse IP-ja e kompjuterit ndryshon, përditëso `.env` dhe `server.js` me IP-në e re
- Për të gjetur IP-në e re: `hostname -I | awk '{print $1}'`

---

## Metoda 2: Përmes Capacitor (Aplikacion Native)

### Hapat:

1. **Build aplikacionin:**
   ```bash
   cd carfront-ionic
   npm run build
   ```

2. **Shto platformën Android/iOS:**
   ```bash
   npx cap add android
   # ose
   npx cap add ios
   ```

3. **Sync me Capacitor:**
   ```bash
   npx cap sync
   ```

4. **Hap në Android Studio / Xcode:**
   ```bash
   npx cap open android
   # ose
   npx cap open ios
   ```

5. **Build dhe instaloj në telefon përmes Android Studio/Xcode**

---

## Troubleshooting

### Nëse nuk hapet në telefon:
- Kontrollo që telefoni dhe kompjuteri janë në të njëjtën WiFi
- Kontrollo firewall-in në kompjuter
- Verifiko që backend po dëgjon në `0.0.0.0:8000` (jo vetëm localhost)
- Përditëso IP-në në `.env` nëse kompjuteri ka marrë IP të re

