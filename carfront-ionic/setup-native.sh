#!/bin/bash

# Script për setup të aplikacionit native

echo "🚀 Duke konfiguruar aplikacionin native..."

# Kontrollo Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Node.js version $NODE_VERSION detektuar. Capacitor kërkon Node.js >= 20.0.0"
    echo "📝 Përditëso Node.js ose përdor nvm:"
    echo "   nvm install 20"
    echo "   nvm use 20"
    exit 1
fi

# Build aplikacionin
echo "📦 Duke build aplikacionin..."
npm run build

# Kontrollo nëse Capacitor është init
if [ ! -f "capacitor.config.ts" ]; then
    echo "⚙️  Duke init Capacitor..."
    npx cap init "Car Marketplace" "com.carmarketplace.app" --web-dir=dist
fi

# Shto platformën (zgjidh Android ose iOS)
if [ "$1" == "android" ]; then
    echo "🤖 Duke shtuar platformën Android..."
    npx cap add android
    echo "✅ Android u shtua! Tani ekzekuto: npm run cap:android"
elif [ "$1" == "ios" ]; then
    echo "🍎 Duke shtuar platformën iOS..."
    npx cap add ios
    echo "✅ iOS u shtua! Tani ekzekuto: npm run cap:ios"
else
    echo "📝 Përdorimi: ./setup-native.sh [android|ios]"
    echo "   P.sh: ./setup-native.sh android"
    exit 1
fi

# Sync
echo "🔄 Duke sync me Capacitor..."
npx cap sync

echo "✅ Setup i kompletuar!"
echo ""
echo "📱 Për të hapur në Android Studio: npm run cap:android"
echo "📱 Për të hapur në Xcode: npm run cap:ios"

