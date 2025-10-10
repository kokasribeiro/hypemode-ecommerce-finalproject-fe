import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBody, validateQuery, validateParams, sanitizeInput } from '../middleware/validation.js';
import { createProductSchema, updateProductSchema, productQuerySchema, idParamSchema } from '../schemas/validationSchemas.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);

router.get('/', validateQuery(productQuerySchema), getProducts);
router.get('/:id', validateParams(idParamSchema), getProduct);
router.post('/', protect, authorize('admin'), validateBody(createProductSchema), createProduct);
router.put('/:id', protect, authorize('admin'), validateParams(idParamSchema), validateBody(updateProductSchema), updateProduct);
router.delete('/:id', protect, authorize('admin'), validateParams(idParamSchema), deleteProduct);

export default router;

