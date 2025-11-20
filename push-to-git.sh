#!/bin/bash

# Script për të bërë push në GitHub

cd "$(dirname "$0")"

echo "🚀 Duke bërë push në GitHub..."
echo ""

# Pull fillimisht (nëse ka ndryshime në remote)
echo "📥 Pull ndryshimet nga remote..."
git pull origin main --no-rebase

# Nëse pull dështoi për shkak të konfliktit, bëj merge
if [ $? -ne 0 ]; then
    echo "⚠️  Pull dështoi. Duke provuar force push..."
    echo ""
    echo "A dëshiron të mbivendosësh remote me versionin lokal? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git push origin main --force
    else
        echo "❌ Push u anulua."
        exit 1
    fi
else
    # Push normal
    echo "📤 Push ndryshimet..."
    git push origin main
fi

echo ""
echo "✅ Push u përfundua!"


