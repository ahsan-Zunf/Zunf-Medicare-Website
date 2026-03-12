// Backend API Configuration - Direct Production URL
console.log('🔍 [ENV] Finalizing API Configuration for Production');

// ✅ Direct URL for Goohle Cloud Backend (UPDATED)
export const API_BASE_URL = 'https://zunf-medicare-website-378538196369.europe-west1.run.app';

console.log(`🔧 [API] Resolved URL: ${API_BASE_URL}`);

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