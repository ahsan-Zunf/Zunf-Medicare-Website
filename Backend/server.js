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

const app = express();

// Railway injects a PORT env var. We MUST use it and NOT overwrite it with .env
const PORT = process.env.PORT || 8000;

console.log('🚀 [STARTUP] Initializing server...');

// ✅ Clean CORS origins - Explicitly adding your domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://newzunf.netlify.app',
  'https://zunfmedicare.com',
  'https://www.zunfmedicare.com',
  'https://zunf-medicare-website.up.railway.app' // Railway internal domain
];

// Add FRONTEND_URL from environment variables if it exists
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.trim());
}

// ✅ Improved CORS middleware to handle Preflight (OPTIONS) correctly
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Check if the origin is in our allowed list
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
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// ✅ Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Request logger (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`🌐 [${req.method}] ${req.url} from ${req.ip}`);
    next();
  });
}

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'zunf-medicare-backend',
    timestamp: new Date().toISOString()
  });
});

// ✅ API Routes
app.use('/labs', labRoutes);
app.use('/messages', messageRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/health-card', healthCardRoutes);
app.use('/booking', bookingRoutes);
app.use('/chat', chatRoutes);
app.use('/leads', leadRoutes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.url });
});

// ✅ Global error handler
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
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 [SERVER] Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ [SERVER] DB connection failed:', err.message);
    process.exit(1);
  });