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

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Relaxed CSP for unified deployment compatibility
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({
  exposedHeaders: ['Bypass-Tunnel-Reminder']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Database Global State
global.dbMode = 'mongodb';
global.mockDB = null;

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        mode: global.dbMode,
        database: global.dbMode === 'mongodb' ? (mongoose.connection.readyState === 1 ? 'connected' : 'disconnected') : 'active (zero-config)',
        timestamp: new Date()
    });
});

// MongoDB Connection with Auto-Fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/margai';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully');
    global.dbMode = 'mongodb';
})
.catch((err) => {
    console.warn('⚠️ Local MongoDB unreachable. Initializing ZERO-CONFIG FALLBACK (NeDB)...');
    global.dbMode = 'fallback';
    global.mockDB = {
        users: Datastore.create({ filename: path.join(__dirname, 'data', 'users.db'), autoload: true }),
        profiles: Datastore.create({ filename: path.join(__dirname, 'data', 'profiles.db'), autoload: true })
    };
    console.log('🚀 ZERO-CONFIG MODE: All features (Register/Login) are now functional using local storage.');
});

// SERVE FRONTEND (Production only)
// 1. Static assets
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. Catch-all: Send all non-API requests to index.html
app.use((req, res) => {
  if (req.url.startsWith('/api/')) return res.status(404).json({ message: 'API route not found' });
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`📡 Marg.ai Unified Server running on port ${PORT}`);
});
