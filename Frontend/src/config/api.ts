// Backend API Configuration
// Vite environment variables are used to switch between 'local' and 'production'
// By default, it uses 'local' for dev and 'production' for builds

const isProd = import.meta.env.PROD;

// Prioritize VITE_API_URL env var, fall back to hardcoded production URL if in prod mode, else localhost
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isProd
    ? 'https://zunf-medicare-website.up.railway.app'
    : 'http://localhost:5000');

const API_MODE = import.meta.env.VITE_API_MODE || (isProd ? 'production' : 'local');

// Log which API is being used
if (true) { // Always log for debugging during deployment phase
  console.log(`🔧 [API] Mode: ${API_MODE}, URL: ${API_BASE_URL}`);
}
