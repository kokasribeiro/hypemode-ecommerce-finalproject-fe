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

const router = express.Router();

router.use(protect); // All order routes require authentication

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/my-orders', getUserOrders);
router.get('/admin/all', authorize('admin'), getAllOrders);
router.get('/:id', getOrder);
router.put('/:id/status', authorize('admin'), updateOrderStatus);
router.post('/:id/payment', createPaymentIntent);
router.delete('/:id', deleteOrder);

export default router;
