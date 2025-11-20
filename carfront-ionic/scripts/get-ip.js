#!/usr/bin/env node

// Script për të gjetur IP-në e kompjuterit automatikisht
const os = require('os');

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
  
  return 'localhost';
}

const ip = getLocalIP();
console.log(ip);
process.exit(0);

