require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const labRoutes = require('./routes/labRoutes');
const messageRoutes = require('./routes/messageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const healthCardRoutes = require('./routes/healthCardRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const leadRoutes = require('./routes/leadRoutes');
const reportRoutes = require('./routes/reportRoutes'); // ✅ NEW: Report Route Import

const app = express();

// ✅ SEO FIX: Redirect www to non-www
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `https://${newHost}${req.originalUrl}`);
  }
  next();
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
app.use('/reports', reportRoutes); // ✅ NEW: Report Route API Use

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