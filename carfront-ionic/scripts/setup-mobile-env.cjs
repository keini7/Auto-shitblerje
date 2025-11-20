#!/usr/bin/env node

// Script për të vendosur IP-në automatikisht në environment para build
const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  // Kërko në të gjitha network interfaces
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) dhe non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        // Prefero IP që fillon me 192.168, 10., ose 172.
        if (iface.address.startsWith('192.168.') || 
            iface.address.startsWith('10.') || 
            iface.address.startsWith('172.')) {
          return iface.address;
        }
      }
    }
  }
  
  // Nëse nuk gjejmë, kthe IP-në e parë që nuk është loopback
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return null;
}

const ip = getLocalIP();
const envPath = path.join(__dirname, '..', '.env');
const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.ts');

console.log(`🔍 IP e gjetur: ${ip || 'localhost (nuk u gjet IP lokal)'}`);

// Përditëso .env
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Përditëso ose shto VITE_API_BASE_URL
if (ip) {
  if (envContent.includes('VITE_API_BASE_URL=')) {
    envContent = envContent.replace(/VITE_API_BASE_URL=.*/g, `VITE_API_BASE_URL=http://${ip}:8000`);
  } else {
    envContent += `\n# Auto-detected server IP\nVITE_API_BASE_URL=http://${ip}:8000\n`;
  }
} else {
  // Nëse nuk gjejmë IP, përdor localhost
  if (envContent.includes('VITE_API_BASE_URL=')) {
    envContent = envContent.replace(/VITE_API_BASE_URL=.*/g, 'VITE_API_BASE_URL=http://localhost:8000');
  } else {
    envContent += `\nVITE_API_BASE_URL=http://localhost:8000\n`;
  }
}

fs.writeFileSync(envPath, envContent.trim() + '\n');
console.log(`✅ .env u përditësua`);

// Përditëso capacitor.config.ts
if (fs.existsSync(capacitorConfigPath)) {
  let configContent = fs.readFileSync(capacitorConfigPath, 'utf8');
  
  if (ip) {
    // Zëvendëso server.url me IP-në e re
    const serverUrlRegex = /(server:\s*\{[^}]*url:\s*['"])([^'"]+)(['"])/s;
    if (serverUrlRegex.test(configContent)) {
      configContent = configContent.replace(serverUrlRegex, `$1http://${ip}:8000$3`);
      console.log(`✅ capacitor.config.ts u përditësua me IP: ${ip}`);
    } else {
      // Nëse nuk ka server.url, shtoje
      const serverConfig = `  server: {
    url: 'http://${ip}:8000',
    cleartext: true,
    androidScheme: 'https',
    iosScheme: 'https',
  },`;
      
      // Gjej vendin ku duhet të shtohet (pas webDir)
      if (configContent.includes('webDir:')) {
        configContent = configContent.replace(
          /(webDir:\s*['"][^'"]+['"],?\s*\n)/,
          `$1${serverConfig}\n`
        );
        console.log(`✅ capacitor.config.ts u përditësua me IP: ${ip}`);
      }
    }
  } else {
    // Nëse nuk gjejmë IP, heq server.url (do të përdorë localhost)
    configContent = configContent.replace(/server:\s*\{[^}]+\},?\s*\n/g, '');
    console.log(`⚠️  IP nuk u gjet, server.url u hoq (do të përdorë localhost)`);
  }
  
  fs.writeFileSync(capacitorConfigPath, configContent);
}
