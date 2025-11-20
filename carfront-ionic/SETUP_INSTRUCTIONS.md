# 📱 Udhëzime për Setup të Aplikacionit Native

## ✅ Çfarë u bë:

1. ✅ IP u gjet automatikisht: 192.168.1.216
2. ✅ Aplikacioni u build me sukses
3. ⚠️ Node.js version është 18.19.1 (nevojitet >= 20.0.0)

## 🔧 Hapi i ardhshëm: Përditëso Node.js

### Opsioni 1: Me nvm (tashmë u instalua)

Hap një terminal të ri dhe ekzekuto:

```bash
# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instalo dhe përdor Node.js 20
nvm install 20
nvm use 20

# Verifiko
node --version  # Duhet të tregojë v20.x.x

# Pastaj ekzekuto:
cd /home/keini/Desktop/auto/carfront-ionic
npx cap add android
npx cap sync
npx cap open android
```

### Opsioni 2: Përditëso Node.js direkt

Shkarko nga: https://nodejs.org/ (version LTS 20.x ose më i ri)

## 📝 Komandat e plota pas përditësimit:

```bash
cd /home/keini/Desktop/auto/carfront-ionic

# IP u gjet automatikisht, build u bë
# Tani shto Android platform:
npx cap add android

# Sync me Capacitor
npx cap sync

# Hap në Android Studio
npx cap open android
```

## 🎯 Në Android Studio:

1. Prit që të ngarkohet projekti
2. Zgjidh një emulator ose lidh telefonin me USB
3. Aktivizo "USB Debugging" në telefon (Settings > Developer Options)
4. Kliko "Run" (▶️) për të instaluar aplikacionin

