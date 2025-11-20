const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

console.log('[Config] Base URL from env:', import.meta.env.VITE_API_BASE_URL);
console.log('[Config] Using base URL:', baseUrl);

export const API_BASE_URL = `${baseUrl.replace(/\/$/, '')}/api`;
export const AUTH_URL = `${API_BASE_URL}/auth`;
export const UPLOAD_URL = `${API_BASE_URL}/upload`;

console.log('[Config] API_BASE_URL:', API_BASE_URL);

export const buildImageUrl = (path?: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseUrl.replace(/\/$/, '')}${path}`;
};

export default {
  API_BASE_URL,
  AUTH_URL,
  UPLOAD_URL,
  buildImageUrl,
};

