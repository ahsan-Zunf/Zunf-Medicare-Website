require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Models
const labModel = require('./models/labModel'); // 🚀 NEW: Import for dynamic sitemap

// Routes
const labRoutes = require('./routes/labRoutes');
const messageRoutes = require('./routes/messageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const healthCardRoutes = require('./routes/healthCardRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const leadRoutes = require('./routes/leadRoutes');
const reportRoutes = require('./routes/reportRoutes'); 
const blogRoutes = require('./routes/blogRoutes'); 
const testRoutes = require('./routes/testRoutes'); 

const app = express();

// 🚀 SEO PRO FIX: Prerender.io Middleware
const prerender = require('prerender-node').set('prerenderToken', 'ZFu0vdvEhhVv8hW5oBxo');
app.use(prerender);

// ✅ SEO FIX: Redirect www to non-www
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `https://${newHost}${req.originalUrl}`);
  }
  next();
});

// ✅ SEO FIX: 301 Permanent Redirect for Old Lab Test URLs (Moved outside of Dev block)
app.get('/lab/:labId/test/:testId', (req, res) => {
  const { labId, testId } = req.params;
  // Google ko batayein ke page permanently naye address par shift ho gaya hai
  res.redirect(301, `/test/${testId}?lab=${labId}`);
});

// ==========================================
// 🚀 SEO PRO: Automatic Dynamic Sitemap
// ==========================================
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://zunfmedicare.com';
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages
  const staticPages = [
    '', '/about', '/contact', '/services/labs',
    '/services/health-program', '/services/school-health-program',
    '/services/corporate-health-screening', '/clients'
  ];

  staticPages.forEach(page => {
    xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // 2. Dynamic Pages (Aapke 2500+ Tests)
  try {
    const labsList = labModel.getLabs();
    
    labsList.forEach(lab => {
      const labData = labModel.getLabTests(lab.id);
      
      if (labData && labData.tests) {
        labData.tests.forEach(test => {
          xml += `  <url>\n    <loc>${baseUrl}/test/${test.id}?lab=${lab.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
        });
      }
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  xml += `</urlset>`;

  // Browser/Google ko batana ke yeh XML file hai
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// ✅ Google Cloud Run uses 8080 by default
const PORT = process.env.PORT || 8080;

console.log('🚀 [STARTUP] Initializing server...');

// ✅ Clean CORS origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://newzunf.netlify.app',
  'https://zunfmedicare.com',
  'https://www.zunfmedicare.com',
  'https://zunf-medicare-website-378538196369.europe-west1.run.app' // Google Cloud URL
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.trim());
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowed => origin === allowed || origin.endsWith(allowed));
    if (isAllowed) {
      return callback(null, true);
    } else {
      console.warn(`🚫 CORS blocked: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`🌐 [${req.method}] ${req.url} from ${req.ip}`);
    next();
  });
}

// ✅ Health check (Google Cloud needs this)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'zunf-medicare-backend',
    timestamp: new Date().toISOString()
  });
});

app.use('/labs', labRoutes);
app.use('/messages', messageRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/health-card', healthCardRoutes);
app.use('/booking', bookingRoutes);
app.use('/chat', chatRoutes);
app.use('/leads', leadRoutes);
app.use('/reports', reportRoutes); 
app.use('/blogs', blogRoutes); 
app.use('/tests', testRoutes); 

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.url });
});

app.use((err, req, res, next) => {
  console.error('💥 [ERROR]', err.stack);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    error: isProd ? 'Internal server error' : err.message
  });
});

// ✅ Start server
connectDB()
  .then(() => {
    console.log('✅ [SERVER] Database connected');
    // '0.0.0.0' is mandatory for Google Cloud Run
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 [SERVER] Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ [SERVER] DB connection failed:', err.message);
    process.exit(1);
  });