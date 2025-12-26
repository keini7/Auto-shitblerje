// Funksion për të gjetur portin e backend-it
async function findBackendPort(): Promise<number> {
  // Nëse ka VITE_API_BASE_URL, përdor portin nga ai
  if (import.meta.env.VITE_API_BASE_URL) {
    try {
      const url = new URL(import.meta.env.VITE_API_BASE_URL);
      return parseInt(url.port) || 8000;
    } catch (e) {
      // Ignoro error-in
    }
  }

  if (import.meta.env.DEV) {
    try {
      const portInfo = await fetch('/backend-port.json').then(res => {
        if (res.ok) return res.json();
        return null;
      }).catch(() => null);
      if (portInfo && portInfo.port) {
        console.log(`[Config] Backend port found in file: ${portInfo.port}`);
        return portInfo.port;
      }
    } catch (e) {
      // Ignoro error-in
    }
  }

  const startPort = 8000;
  const maxPort = 8010; // Provë deri në 8010
  
  for (let port = startPort; port <= maxPort; port++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300); // Timeout 300ms
      
      const response = await fetch(`http://localhost:${port}/api`, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log(`[Config] Backend found on port ${port}`);
        // Ruaj portin në localStorage për përdorim të ardhshëm
        if (typeof window !== 'undefined') {
          localStorage.setItem('backendPort', port.toString());
        }
        return port;
      }
    } catch (e) {
      // Porti nuk është i disponueshëm, provo tjetrin
      continue;
    }
  }

  // Nëse nuk gjejmë, kthe portin default
  console.warn('[Config] Backend not found, using default port 8000');
  return 8000;
}

// Gjej portin e backend-it (përdor cache nëse ekziston)
function getBackendPort(): number {
  // Nëse ka VITE_API_BASE_URL, përdor portin nga ai
  if (import.meta.env.VITE_API_BASE_URL) {
    try {
      const url = new URL(import.meta.env.VITE_API_BASE_URL);
      return parseInt(url.port) || 8000;
    } catch (e) {
      // Ignoro error-in
    }
  }

  // Në development, provo të lexosh nga localStorage
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const cachedPort = localStorage.getItem('backendPort');
    if (cachedPort) {
      return parseInt(cachedPort) || 8000;
    }
  }

  return 8000;
}

// Gjej portin fillestar (mund të përditësohet më vonë)
let backendPort: number = getBackendPort();

// Në development mode, gjej portin automatikisht në background
if (import.meta.env.DEV) {
  findBackendPort().then(port => {
    if (port !== backendPort) {
      backendPort = port;
      console.log('[Config] Backend port updated to:', backendPort);
      // Përditëso baseUrl nëse është e nevojshme
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('backendPortChanged', { detail: port }));
      }
    }
  }).catch(() => {
    console.warn('[Config] Failed to detect backend port, using default 8000');
  });
}

// Funksion për të marrë baseUrl dinamikisht
function getBaseUrl(): string {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Në development, përditëso portin nga localStorage nëse ekziston
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const cachedPort = localStorage.getItem('backendPort');
    if (cachedPort) {
      return `http://localhost:${cachedPort}`;
    }
  }
  return `http://localhost:${backendPort}`;
}

const baseUrl = getBaseUrl();

console.log('[Config] Base URL from env:', import.meta.env.VITE_API_BASE_URL);
console.log('[Config] Using base URL:', baseUrl);

// Funksione për të marrë URL-të dinamikisht
export function getApiBaseUrl(): string {
  const url = getBaseUrl();
  return `${url.replace(/\/$/, '')}/api`;
}

export function getAuthUrl(): string {
  return `${getApiBaseUrl()}/auth`;
}

export function getUploadUrl(): string {
  return `${getApiBaseUrl()}/upload`;
}

// Eksporto edhe si konstante për kompatibilitet (përdor portin fillestar)
export const API_BASE_URL = getApiBaseUrl();
export const AUTH_URL = getAuthUrl();
export const UPLOAD_URL = getUploadUrl();

console.log('[Config] API_BASE_URL:', API_BASE_URL);

export const buildImageUrl = (path?: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const url = getBaseUrl();
  return `${url.replace(/\/$/, '')}${path}`;
};

export default {
  API_BASE_URL,
  AUTH_URL,
  UPLOAD_URL,
  buildImageUrl,
};

