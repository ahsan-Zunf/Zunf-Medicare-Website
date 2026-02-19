// Backend API Configuration
// Vite environment variables are used to switch between 'local' and 'production'
// By default, it uses 'local' for dev and 'production' for builds

const isProd = import.meta.env.PROD;
const API_MODE = import.meta.env.VITE_API_MODE || (isProd ? 'production' : 'local');

const API_URLS = {
  local: 'http://localhost:5000',
  production: import.meta.env.VITE_API_URL || 'https://observant-serenity-production.up.railway.app'
};

export const API_BASE_URL = API_URLS[API_MODE as keyof typeof API_URLS] || API_URLS.local;

// Log which API is being used
if (!isProd) {
  console.log(`🔧 [API] Using ${API_MODE} backend: ${API_BASE_URL}`);
}
