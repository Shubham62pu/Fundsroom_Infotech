import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './modules/auth/routes';

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow all origins in development; in production lock this down via FRONTEND_URL
    callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
