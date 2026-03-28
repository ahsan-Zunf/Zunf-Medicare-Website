import fs from 'fs';

const BASE_URL = 'https://zunfmedicare.com';
const API_URL = 'https://zunf-medicare-website-378538196369.europe-west1.run.app';

const staticPages = [
  '', '/about', '/contact', '/services/labs',
  '/services/health-program', '/services/school-health-program',
  '/services/corporate-health-screening', '/clients'
];

const labs = [
    "chughtai-lab", "dr-essa-lab", "test-zone",
    "biotech-lahore", "ayzal-lab", "jinnah-mri", "esthetique-canon"
];

async function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const today = new Date().toISOString().split('T')[0];

  // 1. Static Pages Add Karna
  staticPages.forEach(page => {
    sitemap += `  <url>\n    <loc>${BASE_URL}${page}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  console.log("🚀 Generating Dynamic Links for Labs...");

  // 2. Backend API se Tests utha kar Dynamic Links Banana
  for (const lab of labs) {
    try {
      // Aapki api.ts ke mutabiq exact route
      const response = await fetch(`${API_URL}/labs/${lab}`); 
      
      if (response.ok) {
        const data = await response.json();
        
        // Handle both Array and Object formats (jo aapki api.ts mein likha hai)
        const testsArray = Array.isArray(data) ? data : data.tests;

        if (testsArray && testsArray.length > 0) {
           testsArray.forEach(test => {
             // Har test ka alag URL ban raha hai
             sitemap += `  <url>\n    <loc>${BASE_URL}/lab/${lab}/test/${test.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
           });
           console.log(`✅ Added ${testsArray.length} tests for ${lab}`);
        } else {
           console.log(`⚠️ No tests found for ${lab}`);
        }
      } else {
        console.error(`❌ Failed to fetch ${lab} (Status: ${response.status})`);
      }
    } catch (error) {
      console.error(`Error fetching tests for ${lab}:`, error.message);
    }
  }

  sitemap += `</urlset>`;

  // File ko public folder mein save karna taake wo domain/sitemap.xml par live ho sake
  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('🎉 sitemap.xml successfully generated with ALL dynamic tests!');
}

generateSitemap();