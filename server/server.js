const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Datastore = require('nedb-promises');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// FIX FOR RENDER PROXY
app.set('trust proxy', 1);

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());
app.use(morgan('combined'));
app.use(express.json());

app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Bypass-Tunnel-Reminder'],
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use('/api/', limiter);

// ================= ROUTES =================
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// TEST ROUTE
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API working successfully',
  });
});

// ================= DATABASE =================
global.dbMode = 'mongodb';
global.mockDB = null;

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    mode: global.dbMode,
    database:
      global.dbMode === 'mongodb'
        ? mongoose.connection.readyState === 1
          ? 'connected'
          : 'disconnected'
        : 'active (zero-config)',
    timestamp: new Date(),
  });
});

// MongoDB Connection with Fallback
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/margai';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    global.dbMode = 'mongodb';
  })
  .catch((err) => {
    console.warn(
      '⚠️ MongoDB unreachable. Starting fallback database...'
    );

    global.dbMode = 'fallback';

    global.mockDB = {
      users: Datastore.create({
        filename: path.join(__dirname, 'data', 'users.db'),
        autoload: true,
      }),

      profiles: Datastore.create({
        filename: path.join(__dirname, 'data', 'profiles.db'),
        autoload: true,
      }),
    };

    console.log('🚀 Fallback database active');
  });

// ================= FRONTEND =================

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// React Catch-All Route
app.get('*', (req, res) => {
  // Ignore API routes
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'API route not found',
    });
  }

  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`📡 Marg.ai Server running on port ${PORT}`);
});
