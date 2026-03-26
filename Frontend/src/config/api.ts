// Backend API Configuration
console.log('🔍 [ENV] Initializing API Configuration...');

/** * ✅ DEVELOPMENT: Localhost use karein taake EHR aur naye features chalein.
 * ✅ PRODUCTION: Google Cloud Run ka link tab use karein jab aap kaam khatam karke deploy karein.
 */
export const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'  // Laptop par testing ke liye
  : 'https://zunf-medicare-website-378538196369.europe-west1.run.app'; // Live site ke liye

console.log(`🔧 [API] Resolved URL: ${API_BASE_URL}`);

/**
 * ✅ Helper function for API calls
 * Ismein humne credentials aur headers ko behtar kiya hai taake login token sahi se jaye.
 */
export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Browser ke localStorage se token uthayen (agar user login hai)
  const token = localStorage.getItem('token'); 

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Agar token maujood hai toh Authorization header mein daal dein
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    });

    // Agar 401 (Unauthorized) aaye toh iska matlab login expire ho gaya hai
    if (response.status === 401) {
       console.warn('⚠️ Session expired or unauthorized');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      // Agar backend se JSON nahi aya toh text check karein
      const text = await response.text();
      throw new Error(`Expected JSON, but received: ${text.substring(0, 100)}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ API Error [${endpoint}]:`, error);
    throw error;
  }
};