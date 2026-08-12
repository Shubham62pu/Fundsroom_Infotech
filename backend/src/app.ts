import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from './modules/auth/routes';

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);


// Error handler (must be last)
app.use(errorHandler);

export default app;
