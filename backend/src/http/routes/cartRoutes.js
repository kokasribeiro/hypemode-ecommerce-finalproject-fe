import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';
import { validateBody, validateParams, sanitizeInput } from '../middleware/validation.js';
import { addToCartSchema, updateCartItemSchema, idParamSchema } from '../../schemas/validationSchemas.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);
router.use(protect); // All cart routes require authentication

router.get('/', getCart);
router.post('/', validateBody(addToCartSchema), addToCart);
router.put('/:id', validateParams(idParamSchema), validateBody(updateCartItemSchema), updateCartItem);
router.delete('/:id', validateParams(idParamSchema), removeFromCart);
router.delete('/', clearCart);

export default router;
