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
console.log('🚀 [STARTUP] Environment PORT:', process.env.PORT);
console.log('🚀 [STARTUP] Final Resolved PORT:', PORT);
console.log('🚀 [STARTUP] NODE_ENV:', process.env.NODE_ENV);

// ✅ Clean CORS origins - NO trailing spaces!
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://newzunf.netlify.app',
  'https://zunfmedicare.com',
  'https://www.zunfmedicare.com',
  process.env.FRONTEND_URL?.trim()
].filter(Boolean);

// ✅ CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    console.warn(`🚫 CORS blocked: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
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

// ✅ Health check (public - no auth needed)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'zunf-medicare-backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
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
  console.warn(`⚠️  404: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found', path: req.url });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('💥 [ERROR]', err.stack);

  // Don't leak error details in production
  const isProd = process.env.NODE_ENV === 'production';

  res.status(err.status || 500).json({
    error: isProd ? 'Internal server error' : err.message,
    ...(isProd ? {} : { stack: err.stack })
  });
});

// ✅ Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 [SERVER] SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 [UNHANDLED REJECTION]', reason);
});

process.on('uncaughtException', (err) => {
  console.error('💥 [UNCAUGHT EXCEPTION]', err);
  setTimeout(() => process.exit(1), 1000);
});

// ✅ Start server
connectDB()
  .then(() => {
    console.log('✅ [SERVER] Database connected');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 [SERVER] Running on port ${PORT} (PID: ${process.pid})`);
      console.log(`🔗 Public URL: https://zunf-medicare-website.up.railway.app`);
    });
  })
  .catch((err) => {
    console.error('❌ [SERVER] DB connection failed:', err.message);
    process.exit(1);
  });
