// Backend API Configuration
// Switch between 'local' and 'production' as needed

const API_MODE = 'local'; // Using local API
// const API_MODE = 'production';

const API_URLS = {
  local: 'http://localhost:5000',
  production: 'https://observant-serenity-production.up.railway.app'
};

export const API_BASE_URL = API_URLS[API_MODE as keyof typeof API_URLS];

// Log which API is being used
console.log(`🔧 [API] Using ${API_MODE} backend: ${API_BASE_URL}`);
