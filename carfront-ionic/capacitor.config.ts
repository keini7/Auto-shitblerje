import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carmarketplace.app',
  appName: 'Car Marketplace',
  webDir: 'dist',
  // server.url do të përditësohet automatikisht nga scripts/setup-mobile-env.cjs
  // Script-i gjen IP-në e kompjuterit automatikisht dhe e vendos këtu
  server: {
    url: 'http://192.168.1.216:8000', // Auto-updated by setup-mobile-env.cjs
    cleartext: true, // Lejon HTTP (jo vetëm HTTPS)
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#000000',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
