# 📱 Android Project Setup

## ✅ Çfarë është konfiguruar:

1. ✅ `local.properties` - tregon vendndodhjen e Android SDK
2. ✅ SDK path: `/home/keini/Android/Sdk`

## 🚀 Hapi i ardhshëm:

### Nëse Android Studio nuk hapet automatikisht:

1. **Hap Android Studio manualisht**
2. **File > Open**
3. **Zgjidh folder-in:** `/home/keini/Desktop/auto/carfront-ionic/android`

### Në Android Studio:

1. **Prit që Gradle të sync-ojë** (mund të zgjasë disa minuta herën e parë)
2. **Nëse kërkon SDK platform:**
   - Tools > SDK Manager
   - Instalo Android SDK Platform 35 (ose version që kërkon)
   - Instalo Android SDK Build-Tools
3. **Zgjidh një emulator ose lidh telefonin me USB**
4. **Kliko "Run" (▶️)**

## ⚠️ Nëse ke probleme:

- **"SDK location not found"**: Verifiko që `local.properties` ekziston dhe ka path-in e saktë
- **"SDK platform not found"**: Instalo SDK platform në Android Studio (Tools > SDK Manager)
- **"Build failed"**: Kontrollo që ke instaluar të gjitha dependencies në SDK Manager

## 📝 Përditësimi i aplikacionit:

Kur bën ndryshime në kod:

```bash
cd /home/keini/Desktop/auto/carfront-ionic
npm run build
npx cap sync
```

Pastaj në Android Studio, kliko "Run" përsëri.

