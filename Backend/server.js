require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const labRoutes = require('./routes/labRoutes');
const messageRoutes = require('./routes/messageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const healthCardRoutes = require('./routes/healthCardRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const leadRoutes = require('./routes/leadRoutes');

const PORT = process.env.PORT || 8000;
const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://newzunf.netlify.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log("🌐 [SERVER] Incoming request:", req.method, req.url);
  console.log("🌐 [SERVER] Timestamp:", new Date().toISOString());
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("🌐 [SERVER] Request body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

app.use('/labs', labRoutes);
app.use('/messages', messageRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/health-card', healthCardRoutes);
app.use('/booking', bookingRoutes);
app.use('/chat', chatRoutes);
app.use('/leads', leadRoutes);

// Health check and diagnostic info
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    pid: process.pid,
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 [SERVER] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('💥 [SERVER] Uncaught Exception thrown:', err);
  // Give time for logs to win before exiting
  setTimeout(() => process.exit(1), 1000);
});

// Port sharing/conflict detection
// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('✅ [SERVER] Database connection initialized');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 [SERVER] PID ${process.pid} listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ [SERVER] Database connection failed:', err);
    process.exit(1);
  });



