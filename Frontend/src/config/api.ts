// Backend API Configuration
// Vite environment variables switch between local and production

const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;
const mode = import.meta.env.MODE;

console.log('🔍 [ENV] PROD:', isProd, 'DEV:', isDev, 'MODE:', mode);

// ✅ Clean production URL - NO trailing spaces!
const PRODUCTION_URL = 'https://zunf-medicare-website.up.railway.app';
const LOCAL_URL = 'http://localhost:5000';

// Priority: 1) Env var 2) Production fallback 3) Local fallback
export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  (typeof window !== 'undefined' &&
    !['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? PRODUCTION_URL
    : LOCAL_URL);

const API_MODE = import.meta.env.VITE_API_MODE || (isProd ? 'production' : 'local');

console.log(`🔧 [API] Resolved URL: ${API_BASE_URL} (Mode: ${API_MODE})`);

// ✅ Helper function for API calls
export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    // Check if response is HTML (error page) instead of JSON
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error(`Expected JSON, got ${contentType}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ API Error [${endpoint}]:`, error);
    throw error;
  }
};