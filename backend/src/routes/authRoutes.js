import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateBody, sanitizeInput } from '../middleware/validation.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../schemas/validationSchemas.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/me', protect, getMe);
router.put('/profile', protect, validateBody(updateProfileSchema), updateProfile);

export default router;
