import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize, { testConnection, syncDatabase } from './lib/sequelize/database.js';
import errorHandler from './http/middleware/errorHandler.js';
import { generalLimiter, authLimiter, adminLimiter, cartLimiter } from './http/middleware/rateLimiter.js';

import authRoutes from './http/routes/authRoutes.js';
import productRoutes from './http/routes/productRoutes.js';
import cartRoutes from './http/routes/cartRoutes.js';
import orderRoutes from './http/routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173', // Vite preview
  'http://127.0.0.1:4173',
  'http://localhost:5174',
  'http://localhost:5175',
];

const allowedOrigins = [process.env.FRONTEND_URL, ...defaultOrigins].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (like Postman) or same-origin requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost'))) {
        return callback(null, true);
      }

      console.warn(`🚫 CORS blocked request from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', generalLimiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
// Routes with specific rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartLimiter, cartRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    const connected = await testConnection();

    if (!connected) {
      console.error('Failed to connect to database. Exiting...');
      process.exit(1);
    }

    // Sync database (create tables if they don't exist)
    // WARNING: Set force: true only in development to drop and recreate tables
    await syncDatabase(false);

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
