import { Router } from 'express';
import { login, getMe } from './controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { loginSchema } from './schema';

const router = Router();

// Public routes
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/me', authenticate, getMe);

export default router;
