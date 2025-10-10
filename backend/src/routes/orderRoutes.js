import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  createPaymentIntent,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBody, validateParams, sanitizeInput } from '../middleware/validation.js';
import { createOrderSchema, idParamSchema } from '../schemas/validationSchemas.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);
router.use(protect); // All order routes require authentication

router.post('/', validateBody(createOrderSchema), createOrder);
router.get('/', getUserOrders);
router.get('/my-orders', getUserOrders);
router.get('/admin/all', authorize('admin'), getAllOrders);
router.get('/:id', validateParams(idParamSchema), getOrder);
router.put('/:id/status', authorize('admin'), validateParams(idParamSchema), updateOrderStatus);
router.post('/:id/payment', validateParams(idParamSchema), createPaymentIntent);
router.delete('/:id', validateParams(idParamSchema), deleteOrder);

export default router;
